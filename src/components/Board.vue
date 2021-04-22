<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { VNode, CreateElement } from 'vue';

import Fireworks from '../directives/Fireworks';

import Clock from '../sudoku/models/Timer';
import UnitGroup from '../sudoku/models/UnitGroup';
import Tile from '../sudoku/models/Tile';
import Game from '../sudoku/Game';
import Command from '../sudoku/Command';
import Difficulty from '../sudoku/enums/Difficulty';
import { SENTINEL } from '../sudoku/Constants';
import { mergeMapWithSet, filterSameValues, filterHighlightSet } from '../sudoku/helpers/helpers';

@Component({
	directives: {
		Fireworks,
	},
})
export default class Board extends Vue {
	private running = true;

	private time = '00:00';

	private clock: Clock;

	private game!: Game;

	private board: Tile[][] = [];

	private selectedIndex = -1;

	private gameHistory: Command[] = [];

	private difficulty = Difficulty.inhuman;

	private hasWon = false;

	private highlightedTiles: Set<string> = new Set();

	private invalidTiles: Set<string> = new Set();

	private SENTINEL = SENTINEL;

	render(h: CreateElement): VNode {
		return h(
			'span',
			{
				directives: [
					{
						name: 'fireworks',
						value: this.hasWon,
					},
				],
			},
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.$scopedSlots.default!({
				clock: {
					onPause: this.pause,
					onStart: this.start,
					time: this.time,
					running: this.running,
				},
				controls: {
					onUndo: this.undo,
					onReset: () => this.newGame(true),
					onNewGame: this.newGame,
					onErase: () => this.addValue(this.selectedIndex, SENTINEL),
					undoDisabled: !this.gameHistory.length || this.hasWon,
					eraseDisabled: this.hasWon || !this.currentTileHasValue,
				},
				game: {
					tiles: this.tiles,
					selectedIndex: this.selectedIndex,
					hasWon: this.hasWon,
					highlightedTiles: this.highlightedTiles,
					invalidTiles: this.invalidTiles,
					onHighlight: this.highlight,
				},
				onSetDifficulty: (diff: Difficulty) => {
					this.difficulty = diff;
				},
				onNumpadInput: (idx: number, val: number) => this.addValue(idx, val),
				difficulty: this.difficulty,
			})
		);
	}

	mounted(): void {
		window.addEventListener('keypress', this.captureKey);
	}

	get currentTileHasValue(): boolean {
		if (this.selectedIndex > -1) {
			return this.tiles[this.selectedIndex].hasValue;
		}

		return false;
	}

	public captureKey(e: KeyboardEvent): void {
		if (/^[1-9]$/i.test(e.key)) {
			if (this.selectedIndex > -1) {
				this.addValue(this.selectedIndex, Number(e.key));
			}
		}
	}

	public undo(): void {
		const command = this.gameHistory.pop();

		if (command) {
			command.revert();
		}
	}

	public highlight(tile: Tile, index: number): void {
		if (this.selectedIndex === index) {
			this.highlightedTiles = new Set();
			this.selectedIndex = -1;
			return;
		}

		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		const sameNumbers = filterSameValues(this.tiles, tile);
		this.highlightedTiles = filterHighlightSet(sameNumbers, unitGroup);
		this.selectedIndex = index;
	}

	public addValue(index: number, val: number): void {
		if (this.hasWon || index < 0) {
			return;
		}

		const tile = this.tiles[index];

		if (tile.value === val || tile.isFrozen) {
			return;
		}

		const command = new Command(tile, val, tile.value);
		this.gameHistory.push(command);
		command.execute();
	}

	beforeDestroyed(): void {
		window.removeEventListener('keypress', this.captureKey);
	}

	get tiles(): Tile[] {
		return this.board.flat();
	}

	public updateTimer(value: string): void {
		this.time = value;
	}

	public start(): void {
		this.running = true;
		this.clock.start();
	}

	public pause(): void {
		this.clock.pause();
		this.running = false;
	}

	public newGame(isReset = false): void {
		if (this.clock) {
			this.clock.destroy();
		}

		if (isReset) {
			this.board = this.game.memento.getSavedState();
		} else {
			this.game = new Game();
			this.board = this.game.createBoard(this.valueChangedCb, this.difficulty);
		}

		this.clock = new Clock(this.updateTimer);
		this.highlightedTiles = new Set();
		this.invalidTiles = new Set();
		this.selectedIndex = -1;
		this.gameHistory = [];
		this.hasWon = false;
	}

	public checkIfWon(): void {
		const hasWon = this.game.validator.hasWon(this.tiles, this.invalidTiles);

		if (hasWon) {
			this.clock.destroy();
			this.hasWon = true;
		}
	}

	public valueChangedCb(tile: Tile): void {
		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		const validatedTiles = unitGroup.validate();

		this.invalidTiles = mergeMapWithSet(this.invalidTiles, validatedTiles);
		this.checkIfWon();
	}

	@Watch('difficulty', {
		immediate: true,
	})
	difficultyChanged(): void {
		this.newGame();
	}
}
</script>

function h(arg0: string, arg1: ScopedSlotChildren): any { throw new Error('Function not implemented.'); }

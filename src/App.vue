<template>
	<div id="app" class="w-full flex justify-center">
		<div class="flex flex-col justify-between max-w-screen-md">
			<h1 class="text-3xl text-gray-700">Sudoku</h1>

			<div class="flex">
				<div class="flex flex-col justify-center">
					<div class="flex justify-between items-center">
						<difficulty-dropdown :selected="difficulty" @selected="setDifficulty($event)"></difficulty-dropdown>
						<timer :running="running" @pause="pause" @start="start" :time="time"></timer>
					</div>

					<div class="flex flex-shrink-0">
						<div class="relative grid grid-cols-9 grid-rows-9">
							<board-overlay :paused="!running" @start="start"></board-overlay>
							<game-tile
								v-for="(tile, index) in tiles"
								:class="[
									{ 'rounded-tl-md': index === 0 },
									{ 'rounded-tr-md': index === 8 },
									{ 'rounded-bl-md': index === 72 },
									{ 'rounded-br-md': index === 80 },
								]"
								@highlight="highlight"
								:is-highlighted="highlightedTiles.has(tile.id)"
								:is-invalid="invalidTiles.has(tile.id)"
								:key="tile.id"
								:tile="tile"
								:is-selected="selectedTileId === tile.id"
							>
							</game-tile>
						</div>

						<div class="flex flex-col ml-4">
							<base-button @click="reset">Reset</base-button>
							<base-button @click="newGame" class="mt-4">New Game</base-button>

							<base-button :disabled="!gameHistory.length || hasWon" @click="undo" class="mt-auto">Undo</base-button>
							<base-button :disabled="hasWon || !currentTileHasValue" @click="deleteVal" class="mt-4"
								>Erase</base-button
							>
						</div>
					</div>
				</div>
			</div>

			<ul class="flex space-x-1.5 mt-4">
				<numpad v-for="x in 9" :key="x" :num="x" @click.native="numpadClicked(x)" :disabled="hasWon"></numpad>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './sudoku/Game';

import Numpad from './components/Numpad.vue';
import DifficultyDropdown from './components/DifficultyDropdown.vue';
import BaseButton from './components/BaseButton.vue';
import GameTile from './components/GameTile.vue';
import BoardOverlay from './components/BoardOverlay.vue';
import Timer from './components/Timer.vue';
import Tile from './sudoku/models/Tile';
import UnitGroup from './sudoku/models/UnitGroup';
import EditableTile from './sudoku/models/EditableTile';
import Command from './sudoku/models/Command';

import Clock from './sudoku/models/Timer';

import { SENTINEL } from './sudoku/constants';
import Difficulty from './sudoku/models/Difficulty';
import FrozenTile from './sudoku/models/FrozenTile';

@Component({
	components: {
		Numpad,
		GameTile,
		BoardOverlay,
		Timer,
		DifficultyDropdown,
		BaseButton,
	},
})
export default class App extends Vue {
	private game!: Game;

	private board: Tile[][] = [];

	private highlightedTiles: Set<string> = new Set();

	private invalidTiles: Set<string> = new Set();

	private selectedTileId = '';

	private gameHistory: Command[] = [];

	private clock: Clock;

	private running = true;

	private hasWon = false;

	private time = '00:00';

	private difficulty = Difficulty.inhuman;

	created(): void {
		this.game = new Game();
		this.board = this.game.createBoard(this.valueChangedCb, this.difficulty);

		this.clock = new Clock(this.updateTimer);
	}

	public updateTimer(evt: any): void {
		this.time = (evt as CustomEvent).detail;
	}

	mounted(): void {
		window.addEventListener('keypress', this.captureKey);
	}

	beforeDestroyed(): void {
		window.removeEventListener('keypress', this.captureKey);
	}

	get tiles(): Tile[] {
		return this.board.flat();
	}

	get tilesMap(): Map<string, Tile> {
		const map = new Map<string, Tile>();
		this.board.flat().forEach((tile) => {
			map.set(tile.id, tile);
		});

		return map;
	}

	get currentTileHasValue(): boolean {
		if (this.selectedTileId && this.tilesMap.has(this.selectedTileId)) {
			const tile = this.tilesMap.get(this.selectedTileId);

			if (!tile || tile instanceof FrozenTile) return false;

			return tile.hasValue;
		}

		return false;
	}

	public undo(): void {
		const command = this.gameHistory.pop();

		if (command) {
			command.revert();
		}
	}

	public valueChangedCb(tile: Tile): void {
		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		const invalidRows = unitGroup.validate();

		// merge with invalid tiles
		for (const key of invalidRows.keys()) {
			if (invalidRows.get(key)) {
				this.invalidTiles.delete(key);
			} else {
				this.invalidTiles.add(key);
			}
		}

		// we need to do this because vue2 doesn't have reactivity on sets/maps
		this.invalidTiles = new Set(this.invalidTiles);

		this.checkIfWon();
	}

	public checkIfWon(): void {
		const hasWon = this.tiles.every((tile) => tile.hasValue) && this.invalidTiles.size === 0;

		if (hasWon) {
			this.clock.dispose();
			this.hasWon = true;

			setTimeout(() => {
				alert('Tillykke!');
			}, 200);
		}
	}

	public highlight(tile: Tile): void {
		if (this.selectedTileId === tile.id) {
			this.highlightedTiles = new Set();
			this.selectedTileId = '';
			return;
		}

		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		const sameNumbers = this.tiles.filter((t) => t.value === tile.value && tile.hasValue);

		const toHighlight = [...sameNumbers.map((x) => x.id), ...unitGroup.tiles.map((x) => x.id)];

		this.highlightedTiles = new Set(toHighlight);
		this.selectedTileId = tile.id;
	}

	public captureKey(e: KeyboardEvent): void {
		if (/^[1-9]$/i.test(e.key)) {
			if (this.selectedTileId) {
				this.addValue(this.selectedTileId, Number(e.key));
			}
		}
	}

	public addValue(id: string, val: number): void {
		if (this.hasWon) {
			return;
		}

		const tile = this.tilesMap.get(id);

		if (tile?.value === val) {
			// don't set same value
			return;
		}

		if (tile instanceof EditableTile) {
			const command = new Command(tile, val, tile.value);
			this.gameHistory.push(command);
			command.execute();
		}
	}

	public numpadClicked(val: number): void {
		if (this.selectedTileId) {
			this.addValue(this.selectedTileId, val);
		}
	}

	public deleteVal(): void {
		this.addValue(this.selectedTileId, SENTINEL);
	}

	public start(): void {
		this.running = true;
		this.clock.start();
	}

	public pause(): void {
		this.clock.pause();
		this.running = false;
	}

	setDifficulty(diff: Difficulty): void {
		this.difficulty = diff;
		this.newGame();
	}

	public newGame(): void {
		this.highlightedTiles = new Set();
		this.invalidTiles = new Set();
		this.selectedTileId = '';
		this.gameHistory = [];
		this.hasWon = false;
		this.clock.dispose();
		this.clock = new Clock(this.updateTimer);
		this.board = this.game.createBoard(this.valueChangedCb, this.difficulty);
	}

	public reset(): void {
		this.highlightedTiles = new Set();
		this.invalidTiles = new Set();
		this.selectedTileId = '';
		this.gameHistory = [];
		this.clock.dispose();
		this.clock = new Clock(this.updateTimer);
		this.hasWon = false;
		this.board = this.game.memento.getSavedState();
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

body {
	overflow: hidden;
}
</style>

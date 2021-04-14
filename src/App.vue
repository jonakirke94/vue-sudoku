<template>
	<div id="app" class="w-full flex justify-center" @click="clickedOutsideBoard">
		<div class="flex flex-col justify-between max-w-screen-md">
			<h1 class="text-3xl text-gray-700">Sudoku</h1>

			<timer :running="running" @pause="pause" @start="start" :time="time"></timer>

			<div class="relative flex-shrink-0">
				<board-overlay></board-overlay>

				<div class="grid grid-cols-9 grid-rows-9">
					<game-tile
						v-for="tile in tiles"
						@highlight="highlight"
						:is-highlighted="highlightedTiles.has(tile.id)"
						:is-invalid="invalidTiles.has(tile.id)"
						:key="tile.id.repr"
						:tile="tile"
						:is-selected="selectedTileId === tile.id"
					>
					</game-tile>
				</div>
			</div>

			<div class="flex space-x-4 my-4">
				<button
					class="w-20 h-14 rounded-md"
					@click="undo"
					:class="[gameHistory.length ? 'bg-indigo-600' : 'bg-gray-200']"
				>
					Undo
				</button>

				<button
					class="w-20 h-14 rounded-md"
					@click="deleteVal"
					:class="[selectedTileId ? 'bg-red-600' : 'bg-gray-200']"
				>
					Erase
				</button>
			</div>

			<ul class="flex space-x-1">
				<numpad v-for="x in 9" :key="x" :num="x" @click.native="numpadClicked(x)"></numpad>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './sudoku/Game';

import Numpad from './components/Numpad.vue';
import GameTile from './components/GameTile.vue';
import BoardOverlay from './components/BoardOverlay.vue';
import Timer from './components/Timer.vue';
import Tile from './sudoku/models/Tile';
import UnitGroup from './sudoku/models/UnitGroup';
import EditableTile from './sudoku/models/EditableTile';
import Command from './sudoku/models/Command';

import Clock from './sudoku/models/Timer';

import { SENTINEL } from './sudoku/constants';

@Component({
	components: {
		Numpad,
		GameTile,
		BoardOverlay,
		Timer,
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

	private time = '00:00';

	created(): void {
		this.game = new Game();
		this.board = this.game.createBoard(this.valueChangedCb);
		this.clock = new Clock();

		this.clock.on('tick', (evt) => {
			this.time = (evt as CustomEvent).detail;
		});
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

	public undo(): void {
		console.log('undo');
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
	}

	public clickedOutsideBoard(): void {
		// console.log('clicked outside board');
		// this.selectedTileId = '';
		// this.highlightedTiles = new Set();
	}

	public highlight(tile: Tile): void {
		// toggle highlight
		if (this.selectedTileId === tile.id) {
			this.highlightedTiles = new Set();
			this.selectedTileId = '';
			return;
		}

		console.log('in highlight');
		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		this.highlightedTiles = new Set(unitGroup.tiles.map((x) => x.id));
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
</style>

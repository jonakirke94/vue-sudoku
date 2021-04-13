<template>
	<div id="app" class="w-full flex justify-center" @click="clickedOutsideBoard">
		<div class="flex flex-col justify-between max-w-screen-md">
			<h1 class="text-3xl text-gray-700">Sudoku</h1>

			<div class="relative flex-shrink-0">
				<div class="grid grid-cols-3 border border-b-0 border-r-0 border-gray-500 absolute inset-0 pointer-events-none">
					<div
						class="h-48 w-48 block flex-shrink-0 border-b border-r bg-transparent border-gray-700"
						v-for="x in 9"
						:key="x"
					></div>
				</div>

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

			<!-- 	<div class="grid grid-cols-3 grid-rows-3 w-96 mt-96">
				<numpad v-for="x in 9" :key="x" :num="x"></numpad>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './sudoku/Game';

import Numpad from './components/Numpad.vue';
import GameTile from './components/GameTile.vue';
import Tile from './sudoku/models/Tile';
import UnitGroup from './sudoku/models/UnitGroup';
import EditableTile from './sudoku/models/EditableTile';

@Component({
	components: {
		Numpad,
		GameTile,
	},
})
export default class App extends Vue {
	private game!: Game;

	private board: Tile[][] = [];

	private highlightedTiles: Set<string> = new Set();

	private invalidTiles: Set<string> = new Set();

	private selectedTileId = '';

	created(): void {
		this.game = new Game();
		this.board = this.game.createBoard(this.valueChangedCb);
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
		this.selectedTileId = '';
		this.highlightedTiles = new Set();
	}

	public highlight(tile: Tile): void {
		const unitGroup: UnitGroup = this.game.validator.clicked(this.board, tile);

		this.highlightedTiles = new Set(unitGroup.tiles.map((x) => x.id));
		this.selectedTileId = tile.id;
	}

	public captureKey(e: KeyboardEvent): void {
		if (/^[1-9]$/i.test(e.key)) {
			if (this.selectedTileId) {
				this.setTileValue(Number(e.key));
			}
		}
	}

	public setTileValue(num: number): void {
		const tileToUpdate = this.tilesMap.get(this.selectedTileId);
		if (tileToUpdate instanceof EditableTile) {
			(tileToUpdate as EditableTile).value = num;
		}
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

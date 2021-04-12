<template>
	<div id="app" class="w-full flex justify-center">
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
						:key="tile.id.repr"
						:tile="tile"
						:selected-tile="selectedTile"
					></game-tile>
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

@Component({
	components: {
		Numpad,
		GameTile,
	},
})
export default class App extends Vue {
	private game!: Game;

	private tiles: Tile[] = [];

	private selectedTile: Tile | null = null;

	private board: Tile[][] = [];

	created(): void {
		this.game = new Game();

		this.game.on('refresh', this.refresh);

		this.board = this.game.createBoard();
		this.tiles = this.board.flat();
	}

	mounted(): void {
		window.addEventListener('keypress', this.captureKey);
	}

	public initGame(): void {
		this.game.createBoard();
	}

	private refresh(): void {
		this.tiles = this.game.flatTiles;
	}

	public highlight(tile: Tile): void {
		this.game.highlight(tile.location);
		this.selectedTile = tile;
	}

	public captureKey(e: KeyboardEvent): void {
		if (/^[1-9]$/i.test(e.key)) {
			if (this.selectedTile) {
				this.setValue(Number(e.key));
			}
		}
	}

	public setValue(num: number): void {
		console.log(num);
	}

	beforeDestroyed(): void {
		this.game.off('refresh', this.refresh);
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

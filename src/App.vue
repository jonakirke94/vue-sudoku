<template>
	<div id="app" class="w-full flex justify-center pb-20">
		<div class="flex flex-col justify-between max-w-screen-md">
			<h1 class="text-3xl text-gray-700">Sudoku</h1>
			<board>
				<template
					#default="{
						clock: { running, onPause, onStart, time },
						controls: { onUndo, onErase, onNewGame, onReset, undoDisabled, eraseDisabled },
						game: { tiles, selectedIndex, hasWon, highlightedTiles, invalidTiles, onHighlight },
						onSetDifficulty,
						onNumpadInput,
						difficulty,
					}"
				>
					<div class="flex justify-between items-center">
						<difficulty-dropdown :selected="difficulty" @selected="onSetDifficulty"></difficulty-dropdown>
						<timer :running="running" @pause="onPause" @start="onStart">{{ time }}</timer>
					</div>
					<div class="flex-col md:flex-row flex flex-shrink-0">
						<div class="flex flex-col flex-shrink-0 md:flex-row">
							<numpad-list @add="onNumpadInput(selectedIndex, $event)" :disabled="hasWon"></numpad-list>
							<div class="relative grid grid-cols-9 grid-rows-9 flex-shrink-0 mx-0 md:mx-4" id="board">
								<board-overlay :paused="!running" @start="onStart"></board-overlay>
								<game-tile
									v-for="(tile, index) in tiles"
									:class="[
										{ 'rounded-tl-md': index === 0 },
										{ 'rounded-tr-md': index === 8 },
										{ 'rounded-bl-md': index === 72 },
										{ 'rounded-br-md': index === 80 },
									]"
									@highlight="onHighlight($event, index)"
									:is-highlighted="highlightedTiles.has(tile.id)"
									:is-invalid="invalidTiles.has(tile.id)"
									:key="tile.id"
									:tile="tile"
									:is-selected="selectedIndex === index"
								>
								</game-tile>
							</div>
						</div>
						<game-controls
							@undo="onUndo"
							@erase="onErase"
							@reset="onReset"
							@new-game="onNewGame"
							:undo-disabled="undoDisabled"
							:erase-disabled="eraseDisabled"
						></game-controls>
					</div>
				</template>
			</board>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import NumpadList from './components/NumpadList.vue';
import DifficultyDropdown from './components/DifficultyDropdown.vue';
import GameTile from './components/GameTile.vue';
import BoardOverlay from './components/BoardOverlay.vue';
import Timer from './components/Timer.vue';
import GameControls from './components/GameControls.vue';
import Board from './components/Board.vue';

@Component({
	components: {
		NumpadList,
		GameTile,
		BoardOverlay,
		Board,
		Timer,
		DifficultyDropdown,
		GameControls,
	},
})
export default class App extends Vue {}
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

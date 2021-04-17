<template>
	<div
		class="text-xl w-16 h-16 flex justify-center items-center"
		@click.stop="highlightTile"
		:class="[
			isFrozen ? 'text-teal-900' : 'text-gray-500',
			{ 'bg-teal-100': isSelected },
			isHighlighted ? 'bg-gray-200' : 'bg-gray-100',
			borderClasses,
		]"
	>
		<!-- <span v-if="tile.value > 0" :class="{ 'text-red-500': isInvalid }">{{ tile.value }}</span> -->

		<div class="flex flex-col">
			<span class>{{ index }}</span>
			<!-- <span class="text-xs">{{ index }}</span> -->
		</div>

		<slot />
	</div>
</template>

<script lang="ts">
import FrozenTile from '@/sudoku/models/tiles/FrozenTile';
import Tile from '@/sudoku/models/tiles/Tile';
import { Component, Prop, Vue } from 'vue-property-decorator';

import getBorders from '@/sudoku/BorderHelper';

@Component
export default class GameTile extends Vue {
	@Prop({
		required: true,
	})
	tile: Tile;

	@Prop() isSelected: boolean;

	@Prop() index: number;

	@Prop() isHighlighted: boolean;

	@Prop() isInvalid: boolean;

	private isFrozen = false;

	private borderClasses = 'border border-gray-300';

	created(): void {
		this.isFrozen = this.tile instanceof FrozenTile;
		console.log(getBorders(this.index));
	}

	public highlightTile(): void {
		this.$emit('highlight', this.tile);
	}
}
</script>

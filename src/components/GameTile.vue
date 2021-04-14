<template>
	<div
		class="border border-gray-300 text-xl w-16 h-16 flex justify-center items-center"
		@click.stop="highlightTile"
		:class="[
			isFrozen ? 'text-gray-900' : 'text-gray-500',
			{ 'bg-indigo-100': isSelected },
			isHighlighted ? 'bg-gray-200' : 'bg-gray-100',
		]"
	>
		<span v-if="tile.value > 0" :class="{ 'text-red-500': isInvalid }">{{ tile.value }}</span>

		<slot />
	</div>
</template>

<script lang="ts">
import FrozenTile from '@/sudoku/models/FrozenTile';
import Tile from '@/sudoku/models/Tile';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameTile extends Vue {
	@Prop({
		required: true,
	})
	tile: Tile;

	@Prop() isSelected: boolean;

	@Prop() isHighlighted: boolean;

	@Prop() isInvalid: boolean;

	private isFrozen = false;

	created(): void {
		this.isFrozen = this.tile instanceof FrozenTile;
	}

	public highlightTile(): void {
		this.$emit('highlight', this.tile);
	}
}
</script>

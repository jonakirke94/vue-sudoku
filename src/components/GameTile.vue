<template>
	<div
		class="border border-gray-300 text-xl w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 flex justify-center items-center"
		@click.stop="highlightTile"
		:class="[
			tile.isFrozen ? 'text-teal-900' : 'text-gray-500',
			{ 'bg-teal-100': isSelected },
			isHighlighted ? 'bg-gray-100' : 'bg-gray-50',
		]"
	>
		<span v-if="tile.value > 0" :class="{ 'text-red-500': isInvalid }">{{ tile.value }}</span>

		<slot />
	</div>
</template>

<script lang="ts">
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

	public highlightTile(): void {
		this.$emit('highlight', this.tile);
	}
}
</script>

<template>
	<div
		class="border border-gray-300 text-gray-900 text-xl w-16 h-16 flex justify-center items-center"
		@click="highlight"
		:class="[{ 'bg-indigo-200': isSelected }, isHighlighted ? 'bg-gray-200' : 'bg-gray-100']"
	>
		<span v-if="tile.value > 0">{{ tile.value }}</span>
	</div>
</template>

<script lang="ts">
import Tile from '@/sudoku/models/Tile';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameTile extends Vue {
	@Prop() private tile!: Tile;

	@Prop() private selectedTile: Tile | null;

	public highlight(): void {
		this.$emit('highlight', this.tile);
	}

	get isHighlighted(): boolean {
		return this.tile.isHighlighted || this.tile.value === this.selectedTile?.value;
	}

	get isSelected(): boolean {
		return this.tile.id === this.selectedTile?.id;
	}
}
</script>

<template>
	<dropdown direction="left">
		<div class="" slot="trigger">
			Difficulty: <span class="capitalize">{{ selectedKey }}</span>
		</div>

		<ul slot="menu" class="w-48">
			<li class="option" v-for="opt in options" :key="opt.value" @click="$emit('selected', opt.value)">
				{{ opt.label }}
			</li>
		</ul>
	</dropdown>
</template>

<script lang="ts">
import Difficulty from '@/sudoku/models/Difficulty';
import { Component, Vue, Prop } from 'vue-property-decorator';

import Dropdown from './Dropdown.vue';

@Component({
	components: {
		Dropdown,
	},
})
export default class DifficultyDropdown extends Vue {
	@Prop()
	selected: Difficulty;

	get options(): any[] {
		return [
			{
				label: 'Easy',
				value: Difficulty.easy,
			},
			{
				label: 'Medium',
				value: Difficulty.medium,
			},
			{
				label: 'Hard',
				value: Difficulty.hard,
			},
			{
				label: 'Very hard',
				value: Difficulty['very-hard'],
			},
			{
				label: 'Insane',
				value: Difficulty.insane,
			},
			{
				label: 'Inhuman',
				value: Difficulty.inhuman,
			},
		];
	}

	get selectedKey(): string {
		return this.options.find((x) => x.value === this.selected).label;
	}
}
</script>

<style>
.option {
	@apply border-t border-gray-100 group flex items-center px-4 py-2 w-full text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer;
}

.option:first-of-type {
	@apply rounded-t-md border-t-0;
}

.option:last-of-type {
	@apply rounded-b-md;
}
</style>

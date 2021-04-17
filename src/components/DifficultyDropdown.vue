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
import Difficulty from '@/sudoku/enums/Difficulty';
import { Component, Vue, Prop } from 'vue-property-decorator';

import Dropdown from './Dropdown.vue';

import DropdownOption from '../sudoku/models/DropdownOption';

@Component({
	components: {
		Dropdown,
	},
})
export default class DifficultyDropdown extends Vue {
	@Prop()
	selected: Difficulty;

	get options(): DropdownOption[] {
		return [
			new DropdownOption('Easy', Difficulty.easy),
			new DropdownOption('Medium', Difficulty.medium),
			new DropdownOption('Very hard', Difficulty.hard),
			new DropdownOption('Insane', Difficulty['very-hard']),
			new DropdownOption('Inhuman', Difficulty.inhuman),
		];
	}

	get selectedKey(): string {
		const val = this.options.find((x) => x.value === this.selected);

		if (val) {
			return val.label;
		}

		return '';
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

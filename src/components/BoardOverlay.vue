<template>
	<div
		class="grid grid-cols-3 border-gray-700 absolute inset-0 transition-all duration-100"
		:class="[paused ? 'bg-white' : 'pointer-events-none']"
	>
		<div
			class="h-48 w-48 block flex-shrink-0 bg-transparent border-gray-700"
			:class="[
				paused ? 'blur-2xl opacity-80 border-transparent' : '',
				{
					'border-r': [1, 2, 4, 5, 7, 8].includes(x),
					'border-b': x <= 6,
				},
			]"
			v-for="x in 9"
			:key="x"
		></div>

		<svg
			v-if="paused"
			class="w-24 h-24 absolute inset-0 m-auto text-gray-600 cursor-pointer hover:text-gray-500"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			@click="$emit('start')"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
			></path>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class BoardOverlay extends Vue {
	@Prop() paused: boolean;
}
</script>

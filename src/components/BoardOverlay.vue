<template>
	<div
		class="absolute inset-0 transition-all duration-300"
		:class="[paused ? 'bg-gray-100 border border-gray-300 rounded-md' : 'pointer-events-none']"
	>
		<template v-if="!paused">
			<div class="absolute h-full bg-gray-700" style="width: 2px; left: calc(33.3333% - 1px)"></div>
			<div class="absolute h-full bg-gray-700" style="width: 2px; left: calc(66.6666% - 1px)"></div>

			<div class="absolute w-full bg-gray-700" style="height: 2px; top: calc(33.3333% - 1px)"></div>
			<div class="absolute w-full bg-gray-700" style="height: 2px; top: calc(66.6666% - 1px)"></div>
		</template>

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

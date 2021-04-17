<template>
	<button
		@click="$emit('click', num)"
		class="w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 flex justify-center items-center rounded-md font-bold text-gray-700 border bg-teal-50 focus:outline-none"
		:disabled="disabled"
		:class="{ 'cursor-default': disabled }"
	>
		{{ num }}
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {
	@Prop() private num!: number;

	@Prop() private disabled = false;
}
</script>

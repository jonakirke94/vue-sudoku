<template>
	<button
		class="w-14 h-14 flex justify-center items-center rounded-md font-bold text-gray-700 border border-teal-600 bg-teal-50 focus:outline-none"
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

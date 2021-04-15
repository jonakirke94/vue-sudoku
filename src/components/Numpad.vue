<template>
	<button
		class="w-14 h-14 flex justify-center items-center rounded-md bg-gray-100"
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

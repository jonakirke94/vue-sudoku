<template>
	<div class="w-14 h-14 flex justify-center items-center rounded-md bg-gray-100" @click="print">
		{{ num }}
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {
	@Prop() private num!: number;

	public print(): void {
		console.log(this.num);
	}
}
</script>

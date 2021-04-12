<template>
	<div class="p-8 border border-gray-700" @click="print">
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

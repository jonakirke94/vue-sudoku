<template>
	<div class="grid grid-cols-3 border border-b-0 border-r-0 border-gray-500 absolute inset-0 pointer-events-none">
		<div
			class="h-48 w-48 block flex-shrink-0 border-b border-r bg-transparent border-gray-700"
			v-for="x in 9"
			:key="x"
		></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BoardOverlay extends Vue {}
</script>

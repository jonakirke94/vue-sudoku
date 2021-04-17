<template>
	<button
		@click="$emit('click')"
		:disabled="disabled"
		class="px-3 p-1 md:px-4 md:py-2 rounded-md border transition-colors font-medium"
		:class="[
			disabled
				? 'cursor-default bg-gray-100 text-gray-900 border-gray-300'
				: 'border-gray-300 text-gray-700 hover:bg-gray-100 shadow',
		]"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {
	@Prop() disabled: boolean;
}
</script>

<template>
	<button
		@click="$emit('click')"
		:disabled="disabled"
		class="px-3 p-1 md:px-4 md:py-2 rounded-md border transition-colors font-medium"
		:class="[
			disabled
				? 'cursor-default bg-gray-200 text-gray-900 border-gray-400'
				: 'border-gray-900 text-gray-700 hover:bg-gray-100 shadow',
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

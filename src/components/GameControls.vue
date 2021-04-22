<template>
	<div class="flex flex-shrink-0 justify-between md:mt-0 mt-4 md:flex-col">
		<base-button @click="$emit('reset')">Reset</base-button>
		<base-button @click="$emit('new-game')" class="md:mt-4">New Game</base-button>

		<base-button :disabled="undoDisabled" @click="$emit('undo')" class="mt-auto">Undo</base-button>
		<base-button :disabled="eraseDisabled" @click="$emit('erase')" class="md:mt-4">Erase</base-button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import BaseButton from './BaseButton.vue';

@Component({
	components: {
		BaseButton,
	},
})
export default class GameControls extends Vue {
	@Prop() undoDisabled: boolean;

	@Prop() eraseDisabled: boolean;
}
</script>

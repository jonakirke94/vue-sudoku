<template>
	<ul class="flex justify-between md:flex-col my-2 md:my-0">
		<numpad v-for="x in 9" :key="x" :num="x" @click="$emit('add', $event)" :disabled="disabled"></numpad>
	</ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Numpad from './Numpad.vue';

@Component({
	components: {
		Numpad,
	},
})
export default class NumpadList extends Vue {
	@Prop() private disabled = false;
}
</script>

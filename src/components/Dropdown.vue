<template>
	<div
		class="relative inline-block text-left"
		@click.stop="clickOpen = !clickOpen"
		@mouseenter="setHoverOpen"
		@mouseleave="setHoverClose"
	>
		<div class="cursor-pointer w-full">
			<slot name="trigger" :open="isOpen" />
		</div>

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<div
				class="origin-top-right absolute mt-2 rounded-md shadow-lg z-50"
				:class="[direction === 'right' ? 'right-0' : 'left-0']"
				v-if="isOpen"
			>
				<div class="rounded-md bg-white shadow-xs">
					<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<div class="border-t border-gray-100" v-if="$slots.header">
							<slot name="header"></slot>
						</div>

						<div @click.stop="close">
							<slot name="menu"></slot>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Dropdown extends Vue {
	@Prop({
		default: 'click',
	})
	trigger: string;

	@Prop({
		default: 'right',
	})
	direction: string;

	private clickOpen = false;

	private hoverOpen = false;

	private hoverDelay = false;

	public close(): void {
		this.clickOpen = false;
		this.hoverOpen = false;
	}

	public setHoverOpen(): void {
		this.hoverOpen = true;
		this.hoverDelay = true;
	}

	public setHoverClose(): void {
		// allow the user to move the cursor outside the menu for a short time
		this.hoverDelay = false;
		setTimeout(() => {
			if (!this.hoverDelay) {
				this.hoverOpen = false;
			}
		}, 100);
	}

	get isOpen(): boolean {
		if (this.trigger === 'click') {
			return this.clickOpen;
		}

		if (this.trigger === 'hover') {
			return this.hoverOpen;
		}

		return false;
	}
}
</script>

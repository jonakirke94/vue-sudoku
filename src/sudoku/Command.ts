// type CommandCallback = (id: string, value: number) => void;

import EditableTile from './models/tiles/EditableTile';

export default class Command {
	tile: EditableTile;

	newVal: number;

	oldVal: number;

	constructor(tile: EditableTile, newVal: number, oldVal: number) {
		this.newVal = newVal;
		this.oldVal = oldVal;
		this.tile = tile;
	}

	execute(): void {
		this.tile.value = this.newVal;
	}

	revert(): void {
		this.tile.value = this.oldVal;
	}
}

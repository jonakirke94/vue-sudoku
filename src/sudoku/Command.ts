import Tile from './models/Tile';

export default class Command {
	tile: Tile;

	newVal: number;

	oldVal: number;

	constructor(tile: Tile, newVal: number, oldVal: number) {
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

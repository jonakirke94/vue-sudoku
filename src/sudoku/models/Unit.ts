import Tile from './Tile';

class Unit {
	tiles: Tile[];

	constructor(tiles: Tile[] = []) {
		this.tiles = tiles;
	}

	public addTile(tile: Tile): void {
		this.tiles.push(tile);
	}

	public highlightUnit(): void {
		this.tiles.forEach((t) => {
			t.isHighlighted = true;
		});
	}
}

export default Unit;

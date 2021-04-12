import Tile from '../models/Tile';

interface AbstractTileFactory {
	createEditableTile(row: number, column: number): Tile;

	createFrozenTile(value: number, row: number, column: number): Tile;
}

export default AbstractTileFactory;

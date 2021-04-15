import Tile from '../models/Tile';

import TileValueCallback from '../types/TileValueCallback';

interface AbstractTileFactory {
	createEditableTile(row: number, column: number, cb: TileValueCallback): Tile;

	createFrozenTile(value: number, row: number, column: number): Tile;
}

export default AbstractTileFactory;

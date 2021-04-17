import Tile from '../models/tiles/Tile';

import TileValueCallback from '../types/TileValueCallback';

interface AbstractTileFactory {
	createEditableTile(x: number, y: number, cb: TileValueCallback): Tile;

	createFrozenTile(x: number, y: number, value: number): Tile;
}

export default AbstractTileFactory;

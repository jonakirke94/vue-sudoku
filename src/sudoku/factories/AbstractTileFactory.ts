import Tile from '../models/Tile';

import TileValueCallback from '../types/TileValueCallback';

interface AbstractTileFactory {
	createTile(x: number, y: number, value: number, cb: TileValueCallback): Tile;
}

export default AbstractTileFactory;

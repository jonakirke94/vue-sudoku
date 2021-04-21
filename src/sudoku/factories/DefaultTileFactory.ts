import Tile from '../models/Tile';
import AbstractTileFactory from './AbstractTileFactory';

import TileValueCallback from '../types/TileValueCallback';

export default class DefaultTileFactory implements AbstractTileFactory {
	public createTile(x: number, y: number, value: number, cb: TileValueCallback): Tile {
		return new Tile(x, y, value, cb);
	}
}

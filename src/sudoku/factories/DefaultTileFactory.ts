import EditableTile from '../models/tiles/EditableTile';
import FrozenTile from '../models/tiles/FrozenTile';
import Tile from '../models/tiles/Tile';
import AbstractTileFactory from './AbstractTileFactory';

import TileValueCallback from '../types/TileValueCallback';

export default class DefaultTileFactory implements AbstractTileFactory {
	public createEditableTile(x: number, y: number, cb: TileValueCallback): Tile {
		return new EditableTile(x, y, cb);
	}

	public createFrozenTile(x: number, y: number, value: number): Tile {
		return new FrozenTile(x, y, value);
	}
}

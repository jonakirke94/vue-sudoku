import EditableTile from '../models/EditableTile';
import FrozenTile from '../models/FrozenTile';
import Tile from '../models/Tile';
import AbstractTileFactory from './AbstractTileFactory';

import TileValueCallback from '../types/TileValueCallback';

export default class DefaultTileFactory implements AbstractTileFactory {
	public createEditableTile(col: number, row: number, cb: TileValueCallback): Tile {
		return new EditableTile(col, row, cb);
	}

	public createFrozenTile(col: number, row: number, value: number): Tile {
		return new FrozenTile(col, row, value);
	}
}

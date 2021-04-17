import Tile from './Tile';

import TileValueCallback from '../../types/TileValueCallback';

class EditableTile extends Tile {
	valueChanged: TileValueCallback;

	constructor(col: number, row: number, cb: TileValueCallback) {
		super(col, row);
		this.valueChanged = cb;
	}

	get value(): number {
		return super.value;
	}

	set value(val: number) {
		this._value = val;
		this.valueChanged(this);
	}
}

export default EditableTile;

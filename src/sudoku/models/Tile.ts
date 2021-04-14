import { v4 as uuidv4 } from 'uuid';
import Location from './Location';

import { SENTINEL } from '../constants';

class Tile {
	id: string;

	protected _value: number;

	row: number;

	col: number;

	location: Location;

	get value(): number {
		return this._value;
	}

	constructor(col: number, row: number, value = SENTINEL) {
		this.id = uuidv4();
		this._value = value;
		this.row = row;
		this.col = col;
		this.location = new Location(row, col);
	}

	get hasValue(): boolean {
		return this._value !== SENTINEL;
	}
}

export default Tile;

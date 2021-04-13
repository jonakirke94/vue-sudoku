import { v4 as uuidv4 } from 'uuid';
import Location from './Location';

class Tile {
	id: string;

	protected _value: number;

	row: number;

	col: number;

	location: Location;

	get value(): number {
		return this._value;
	}

	constructor(col: number, row: number, value = 0) {
		this.id = uuidv4();
		this._value = value;
		this.row = row;
		this.col = col;
		this.location = new Location(row, col);
	}

	get hasValue(): boolean {
		return this._value > 0;
	}
}

export default Tile;

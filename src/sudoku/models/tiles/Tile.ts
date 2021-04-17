import { v4 as uuidv4 } from 'uuid';

import { SENTINEL } from '../../constants';
import Coordinates from '../Coordinates';

class Tile {
	id: string;

	protected _value: number;

	x: number;

	y: number;

	coordinates: Coordinates;

	get value(): number {
		return this._value;
	}

	constructor(x: number, y: number, value = SENTINEL) {
		this.id = uuidv4();
		this._value = value;
		this.x = x;
		this.y = y;
		this.coordinates = new Coordinates(x, y);
	}

	get hasValue(): boolean {
		return this._value !== SENTINEL;
	}
}

export default Tile;

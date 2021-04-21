import type TileValueCallback from '@/sudoku/types/TileValueCallback';
import { v4 as uuidv4 } from 'uuid';

import { SENTINEL } from '../Constants';
import Coordinates from './Coordinates';

class Tile {
	id: string;

	protected _value: number;

	isFrozen: boolean;

	valueChanged: TileValueCallback;

	x: number;

	y: number;

	coordinates: Coordinates;

	constructor(x: number, y: number, value = SENTINEL, cb: TileValueCallback) {
		this.id = uuidv4();
		this._value = value;
		this.x = x;
		this.y = y;

		this.isFrozen = value !== SENTINEL;

		this.valueChanged = cb;
		this.coordinates = new Coordinates(x, y);
	}

	get value(): number {
		return this._value;
	}

	set value(val: number) {
		if (this.isFrozen) {
			throw new Error('Attempting to edit frozen cell');
		}

		this._value = val;
		this.valueChanged(this);
	}

	get hasValue(): boolean {
		return this._value !== SENTINEL;
	}
}

export default Tile;

import { v4 as uuidv4 } from 'uuid';
import Location from './Location';

class Tile {
	id: string;

	value: number;

	row: number;

	col: number;

	location: Location;

	isHighlighted = false;

	constructor(col: number, row: number, value = 0) {
		this.id = uuidv4();
		this.value = value;
		this.row = row;
		this.col = col;
		this.location = new Location(row, col);
	}
}

export default Tile;

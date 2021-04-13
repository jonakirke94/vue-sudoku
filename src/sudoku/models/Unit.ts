import Tile from './Tile';
import ValidationResult from './ValidationResult';

class Unit {
	tiles: Tile[];

	constructor(tiles: Tile[] = []) {
		this.tiles = tiles;
	}

	public validate(): ValidationResult[] {
		const res: ValidationResult[] = [];
		this.tiles.forEach((t) => {
			if (t.hasValue) {
				const valid = this.tiles.filter((x) => x.value === t.value).length === 1;
				res.push(new ValidationResult(t.id, valid));
			}

			res.push(new ValidationResult(t.id, true));
		});

		return res;
	}
}

export default Unit;

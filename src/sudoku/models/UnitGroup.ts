import Tile from './Tile';
import Unit from './Unit';
import ValidationResult from './ValidationResult';

export default class UnitGroup {
	row: Unit;

	col: Unit;

	square: Unit;

	constructor(row: Unit, col: Unit, square: Unit) {
		this.row = row;
		this.col = col;
		this.square = square;
	}

	// we need to merge here or they will override each other
	public validate(): Map<string, boolean> {
		const map = new Map<string, boolean>();

		this.buildMap(map, this.row.validate());
		this.buildMap(map, this.col.validate());
		this.buildMap(map, this.square.validate());

		return map;
	}

	private buildMap(map: Map<string, boolean>, results: ValidationResult[]): Map<string, boolean> {
		results.forEach((valRes) => {
			if (!valRes.valid) {
				map.set(valRes.id, valRes.valid);
			}

			// if its valid only override if not already there
			if (!map.has(valRes.id)) {
				map.set(valRes.id, valRes.valid);
			}
			return map;
		});

		return map;
	}

	get tiles(): Tile[] {
		return [...this.row.tiles, ...this.col.tiles, ...this.square.tiles];
	}
}

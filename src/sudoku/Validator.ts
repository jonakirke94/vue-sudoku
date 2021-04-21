import Tile from './models/Tile';
import Unit from './models/Unit';
import UnitGroup from './models/UnitGroup';
import Coordinates from './models/Coordinates';

export default class Validator {
	public clicked(board: Tile[][], theTile: Tile): UnitGroup {
		const rowUnit = this.getRow(board, theTile.coordinates);

		const colUnit = this.getCol(board, theTile.coordinates);

		const squareUnit = this.getSquare(board, theTile.coordinates);

		return new UnitGroup(rowUnit, colUnit, squareUnit);
	}

	private getRow(board: Tile[][], coords: Coordinates): Unit {
		return new Unit(board[coords.x]);
	}

	private getCol(board: Tile[][], coords: Coordinates): Unit {
		return new Unit(board.map((row) => row[coords.y]));
	}

	private getSquare(board: Tile[][], coords: Coordinates): Unit {
		const getIndices = (index: number): number[] => {
			if (index <= 2) {
				return [0, 1, 2];
			}
			if (index <= 5) {
				return [3, 4, 5];
			}
			return [6, 7, 8];
		};

		const rowIndices = getIndices(coords.x);

		const colIndices = getIndices(coords.y);

		const tArr: Tile[] = [];

		rowIndices.forEach((rowIndex) => {
			tArr.push(board[rowIndex][colIndices[0]]);
			tArr.push(board[rowIndex][colIndices[1]]);
			tArr.push(board[rowIndex][colIndices[2]]);
		});

		return new Unit(tArr);
	}
}

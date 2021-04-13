import Tile from './Tile';
import Unit from './Unit';
import Location from './Location';
import UnitGroup from './UnitGroup';

export default class Validator {
	public clicked(board: Tile[][], theTile: Tile): UnitGroup {
		const rowUnit = this.getRow(board, theTile.location);

		const colUnit = this.getCol(board, theTile.location);

		const squareUnit = this.getSquare(board, theTile.location);

		return new UnitGroup(rowUnit, colUnit, squareUnit);
	}

	private getRow(board: Tile[][], loc: Location): Unit {
		return new Unit(board[loc.row]);
	}

	private getCol(board: Tile[][], loc: Location): Unit {
		return new Unit(board.map((row) => row[loc.col]));
	}

	private getSquare(board: Tile[][], loc: Location): Unit {
		const getIndices = (index: number): number[] => {
			if (index <= 2) {
				return [0, 1, 2];
			}
			if (index <= 5) {
				return [3, 4, 5];
			}
			return [6, 7, 8];
		};

		const rowIndices = getIndices(loc.row);

		const colIndices = getIndices(loc.col);

		const tArr: Tile[] = [];

		rowIndices.forEach((rowIndex) => {
			tArr.push(board[rowIndex][colIndices[0]]);
			tArr.push(board[rowIndex][colIndices[1]]);
			tArr.push(board[rowIndex][colIndices[2]]);
		});

		return new Unit(tArr);
	}
}

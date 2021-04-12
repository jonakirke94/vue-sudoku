import AbstractTileFactory from './factories/AbstractTileFactory';
import Tile from './models/Tile';
import Difficulty from './models/Difficulty';

import Sudoku from './lib/sudoku';
import DefaultTileFactory from './factories/DefaultTileFactory';
import Location from './models/Location';
import MyEventEmitter from './EventEmitter';
import Unit from './models/Unit';

class Game extends MyEventEmitter {
	tileFactory: AbstractTileFactory;

	flatTiles: Tile[] = [];

	board: Tile[][] = [];

	constructor() {
		super();
		this.tileFactory = new DefaultTileFactory();
	}

	createBoard(): Tile[][] {
		const test = Sudoku.generate(Difficulty.easy);

		const board = Sudoku.board_string_to_grid(test);

		console.log(board, 'board');

		const internal: Tile[][] = [];

		board.forEach((col, i) => {
			const intRow: Tile[] = [];
			col.forEach((row, j) => {
				let tile: Tile;
				if (row === '.') {
					tile = this.tileFactory.createEditableTile(i, j);
				} else {
					tile = this.tileFactory.createFrozenTile(i, j, Number(row));
				}

				intRow.push(tile);
				this.flatTiles.push(tile);
			});

			internal.push(intRow);
		});

		this.board = internal;

		return internal;
	}

	private unhighlightAll(): void {
		this.flatTiles.forEach((tile) => {
			tile.isHighlighted = false;
		});
	}

	public highlight(loc: Location): void {
		this.unhighlightAll();

		const rowUnit = this.getRow(loc);
		rowUnit.highlightUnit();

		const colRow = this.getCol(loc);
		colRow.highlightUnit();

		const squareUnit = this.getSquare(loc);
		squareUnit.highlightUnit();

		this.emit('refresh');
	}

	public getRow(loc: Location): Unit {
		return new Unit(this.board[loc.row]);
	}

	public getCol(loc: Location): Unit {
		return new Unit(this.board.map((row) => row[loc.col]));
	}

	public getSquare(loc: Location): Unit {
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

		const square = new Unit();

		rowIndices.forEach((rowIndex) => {
			square.addTile(this.board[rowIndex][colIndices[0]]);
			square.addTile(this.board[rowIndex][colIndices[1]]);
			square.addTile(this.board[rowIndex][colIndices[2]]);
		});

		return square;
	}
}

export default Game;

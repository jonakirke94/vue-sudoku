import AbstractTileFactory from './factories/AbstractTileFactory';
import Tile from './models/Tile';
import Difficulty from './models/Difficulty';

import Sudoku from './lib/sudoku';
import DefaultTileFactory from './factories/DefaultTileFactory';

import TileValueCallback from './types/TileValueCallback';
import Memento from './models/Memento';
import Validator from './models/Validator';

class Game {
	tileFactory: AbstractTileFactory;

	memento: Memento;

	validator: Validator;

	constructor() {
		this.tileFactory = new DefaultTileFactory();
		this.validator = new Validator();
	}

	createBoard(tileValueCb: TileValueCallback, difficulty: Difficulty): Tile[][] {
		const generatedGame = Sudoku.generate(Difficulty[difficulty]);

		const grid = Sudoku.board_string_to_grid(generatedGame);

		const board: Tile[][] = [];

		grid.forEach((col, i) => {
			const intRow: Tile[] = [];
			col.forEach((row, j) => {
				let tile: Tile;
				if (row === '.') {
					tile = this.tileFactory.createEditableTile(i, j, tileValueCb);
				} else {
					tile = this.tileFactory.createFrozenTile(i, j, Number(row));
				}

				intRow.push(tile);
			});

			board.push(intRow);
		});

		this.memento = new Memento(board);

		return board;
	}

	/* public highlight(loc: Location): void {
		this.unhighlightAll();

		const rowUnit = this.board.getRow(loc);
		rowUnit.highlightUnit();

		const colRow = this.board.getCol(loc);
		colRow.highlightUnit();

		const squareUnit = this.board.getSquare(loc);
		squareUnit.highlightUnit();
	} */
}

export default Game;

import AbstractTileFactory from './factories/AbstractTileFactory';
import Tile from './models/tiles/Tile';
import Difficulty from './models/Difficulty';

import Sudoku from './lib/sudoku';
import DefaultTileFactory from './factories/DefaultTileFactory';

import TileValueCallback from './types/TileValueCallback';
import Memento from './Memento';
import Validator from './Validator';

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

		console.log(generatedGame, 'generatedGame');

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
}

export default Game;

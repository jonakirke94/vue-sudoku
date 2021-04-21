import AbstractTileFactory from './factories/AbstractTileFactory';
import Tile from './models/Tile';
import Difficulty from './enums/Difficulty';
import Sudoku from './lib/sudoku';
import DefaultTileFactory from './factories/DefaultTileFactory';
import TileValueCallback from './types/TileValueCallback';
import Memento from './Memento';
import Validator from './Validator';
import { SENTINEL } from './Constants';

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
				const value = row === '.' ? SENTINEL : Number(row);
				const tile = this.tileFactory.createTile(i, j, value, tileValueCb);
				intRow.push(tile);
			});

			board.push(intRow);
		});

		this.memento = new Memento(board);

		return board;
	}
}

export default Game;

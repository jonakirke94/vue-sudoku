/* eslint-disable camelcase */
interface Sudoku {
	generate(difficulty: string): string;
	board_string_to_grid(board_string: string): [][];
}

declare let sudoku: Sudoku;
export = sudoku;

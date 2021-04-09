import '../sudoku/sudoku';

declare module 'sudoku' {
    export interface Sudoku {
        generate: string
        board_string_to_grid: string
    }

    export let sudoku: Sudoku;
}

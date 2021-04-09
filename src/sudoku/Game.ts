import AbstractTileFactory from './factories/AbstractTileFactory';
import FrozenTileFactory from './factories/FrozenTileFactory';
import Tile from './models/Tile';

import sudoku from './sudoku';

class Game {
    greeting: string

    tileFactory: AbstractTileFactory

    tiles: Tile[] = []

    constructor(msg: string) {
      this.greeting = msg;
      this.tileFactory = new FrozenTileFactory();

      const test = sudoku.generate('easy');
      console.log(test, 'test');
    }

    addTiles() : void {
      this.tiles.push(this.tileFactory.createTile());
      this.tiles.push(this.tileFactory.createTile());
      this.tiles.push(this.tileFactory.createTile());
    }
}

export default Game;

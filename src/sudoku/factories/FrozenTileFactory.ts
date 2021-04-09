import FrozenTile from '../models/FrozenTile';
import Tile from '../models/Tile';
import AbstractTileFactory from './AbstractTileFactory';

export default class FrozenTileFactory implements AbstractTileFactory {
  public createTile(): Tile {
    return new FrozenTile();
  }
}

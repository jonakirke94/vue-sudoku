import EditableTile from '../models/EditableTile';
import Tile from '../models/Tile';
import AbstractTileFactory from './AbstractTileFactory';

export default class EditableTileFactory implements AbstractTileFactory {
  public createTile(): Tile {
    return new EditableTile();
  }
}

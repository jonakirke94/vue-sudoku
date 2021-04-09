import Tile from '../models/Tile';

interface AbstractTileFactory {
    createTile(): Tile;
}

export default AbstractTileFactory;

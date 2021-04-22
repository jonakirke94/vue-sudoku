import Tile from '../models/Tile';
import UnitGroup from '../models/UnitGroup';

export const mergeMapWithSet = (existingSet: Set<string>, newMap: Map<string, boolean>): Set<string> => {
	// merge with invalid tiles
	for (const key of newMap.keys()) {
		if (newMap.get(key)) {
			existingSet.delete(key);
		} else {
			existingSet.add(key);
		}
	}

	return new Set(existingSet);
};

export const filterSameValues = (tiles: Tile[], highlightedTile: Tile): Tile[] => {
	return tiles.filter((t) => t.value === highlightedTile.value && highlightedTile.hasValue);
};

export const filterHighlightSet = (sameNumberTiles: Tile[], unitGroup: UnitGroup): Set<string> => {
	const toHighlight = [...sameNumberTiles.map((x) => x.id), ...unitGroup.tiles.map((x) => x.id)];

	return new Set(toHighlight);
};

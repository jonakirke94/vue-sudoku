function mergeMapWithSet(existingSet: Set<string>, newMap: Map<string, boolean>): Set<string> {
	// merge with invalid tiles
	for (const key of newMap.keys()) {
		if (newMap.get(key)) {
			existingSet.delete(key);
		} else {
			existingSet.add(key);
		}
	}

	return new Set(existingSet);
}

export default mergeMapWithSet;

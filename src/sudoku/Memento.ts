// import deepcopy from 'deepcopy';
import cloneDeep from 'lodash.clonedeep';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Tile from './models/Tile';

export default class Memento {
	state: Tile[][] = [];

	constructor(state: Tile[][]) {
		this.state = cloneDeep(state);
	}

	public getSavedState(): Tile[][] {
		return cloneDeep(this.state);
	}
}

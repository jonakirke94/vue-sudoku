export default class ValidationResult {
	id: string;

	valid: boolean;

	constructor(id: string, valid: boolean) {
		this.id = id;
		this.valid = valid;
	}
}

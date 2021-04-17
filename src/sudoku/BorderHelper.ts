// TOP LEFT RIGHT BOTTOM

const isBetween = (value: number, num1: number, num2: number) => {
	return value >= num1 && value <= num2;
};

const bottomBorder = (val: number) => isBetween(val, 19, 27) || isBetween(val, 46, 54);

const rightBorder = (val: number) => isBetween(val, 19, 27) || isBetween(val, 46, 54);

export default (index: number): string => {
	return 'LEFT';
};

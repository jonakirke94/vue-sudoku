module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'class-methods-use-this': 'off',
		'linebreak-style': 'off',
		'no-param-reassign': ['error', { props: false }],
		'no-underscore-dangle': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-restricted-syntax': 'off',
	},
};

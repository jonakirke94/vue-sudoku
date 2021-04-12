/* eslint-disable */

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.css', './src/**/*.js'],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans],
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',

			black: '#000',
			white: '#fff',

			gray: colors.blueGray,
			indigo: colors.indigo,
			red: colors.rose,
			yellow: colors.amber,
			orange: colors.orange,
			green: colors.green,
			teal: colors.teal,
			blue: colors.blue,
			pink: colors.pink,
			purple: colors.purple,
		},
	},
	variants: {
		opacity: ['group-hover', 'hover'],
	},
};

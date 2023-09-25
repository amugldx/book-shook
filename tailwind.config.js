/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				text: 'var(--text)',
				background: 'var(--background)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
			},
		},
	},
	plugins: [],
};

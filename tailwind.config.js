/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'prime-orange': '#F16C59',
			},
		},
	},
	plugins: [require('tailwindcss'), require('autoprefixer')],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(10,10,10)',
				secondary: '#4d4d4d',
				footer: 'rgb(119,119,119)',
				primaryText: 'rgb(243,245,247)',
				button: 'rgb(16,16,16)',
				inputText: 'rgb(30,30,30)',
				outlineFocus: 'rgba(243,245,247,.15)'
			}
		},
	},
	plugins: [],
}

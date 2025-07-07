
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(214.3 31.8% 91.4%)',
				input: 'hsl(214.3 31.8% 91.4%)',
				ring: 'hsl(222.2 84% 4.9%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(222.2 84% 4.9%)',
				primary: {
					DEFAULT: 'hsl(220 91% 48%)',
					foreground: 'hsl(0 0% 98%)'
				},
				secondary: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(210 40% 98%)'
				},
				muted: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(215.4 16.3% 46.9%)'
				},
				accent: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(222.2 84% 4.9%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(222.2 84% 4.9%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0 0% 98%)',
					foreground: 'hsl(240 5.3% 26.1%)',
					primary: 'hsl(240 5.9% 10%)',
					'primary-foreground': 'hsl(0 0% 98%)',
					accent: 'hsl(240 4.8% 95.9%)',
					'accent-foreground': 'hsl(240 5.9% 10%)',
					border: 'hsl(220 13% 91%)',
					ring: 'hsl(217.2 91.2% 59.8%)'
				},
				dao: {
					blue: "hsl(220 91% 48%)",
					green: "hsl(142 76% 36%)",
					red: "hsl(0 84% 60%)",
					yellow: "hsl(45 93% 47%)",
					gray: "hsl(215.4 16.3% 46.9%)"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

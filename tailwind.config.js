/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0c0a09', // Matte Black (Stone 950)
                surface: '#1c1917',    // Deep Stone 900
                primary: '#a8a29e',    // Stone 400 (Warm Taupe)
                secondary: '#78716c',  // Stone 500 (Muted Earth)
                accent1: '#c2a07a',    // Soft Gold / Sand
                accent2: '#e7e5e4',    // Cream / Stone 200
                gold: {
                    light: '#d4c3b0',
                    DEFAULT: '#c2a07a',
                    dark: '#8b7355',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                ethnocentric: ['ethnocentric', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'typing': 'typing 2s steps(40, end)',
                'blink': 'blink .75s step-end infinite',
                'spin-slow': 'spin 12s linear infinite',
                'gradient': 'gradient 6s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(15px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                blink: {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#c2a07a' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            }
        },
    },
    plugins: [],
}

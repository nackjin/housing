/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#009AD7', // Habitat blue approx
                    dark: '#0077A8',
                },
                secondary: {
                    DEFAULT: '#003057', // Habitat navy approx
                },
                // New colors for disability awareness card
                cardBg: '#F9FAFB',
                cardHover: '#E5E7EB',
            },
        },
        fontFamily: {
            sans: ['Pretendard', 'Inter', 'sans-serif'],
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    50: '#f0f9f0',
                    100: '#dcf2dc',
                    500: '#3a9b3a',
                    600: '#2b7e2b',
                    700: '#246724',
                },
                earth: {
                    50: '#faf8f3',
                    500: '#b89566',
                    600: '#a6825a',
                }
            }
        },
    },
    plugins: [],
}
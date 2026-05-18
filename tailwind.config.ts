import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './data/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
            // Survival theme colors
            forest: {
                50: '#f0f9f0',
                100: '#dcf2dc',
                200: '#bce5bc',
                300: '#8cd38c',
                400: '#5bb85b',
                500: '#3a9b3a',
                600: '#2b7e2b',
                700: '#246724',
                800: '#205220',
                900: '#1c441c',
            },
            earth: {
                50: '#faf8f3',
                100: '#f4f0e6',
                200: '#e8dfcc',
                300: '#d9c7a8',
                400: '#c8ab82',
                500: '#b89566',
                600: '#a6825a',
                700: '#8a6b4c',
                800: '#705741',
                900: '#5c4836',
            }
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
    },
},
    plugins: [require("tailwindcss-animate")],
}
export default config
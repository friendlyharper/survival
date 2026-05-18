import './globals.css'
import type { Metadata, Viewport } from 'next'
import SessionWrapper from './components/SessionWrapper'
import AskPyro from './components/AskPyro'

export const metadata: Metadata = {
    title: "Pyro's Survival Guide — To Keep the Flame Alive",
    description: 'Colorado survival knowledge base. Life-saving information for alpine, winter, wildlife, flood, desert, plains, urban, and grid-down emergencies. Works offline.',
    keywords: 'Colorado survival, avalanche, hypothermia, altitude sickness, bear attack, flash flood, emergency preparedness, grid-down',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: "Pyro's Survival Guide",
    },
    icons: {
        apple: '/icons/icon-192.png',
    },
}

export const viewport: Viewport = {
    themeColor: '#c2410c',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="font-sans antialiased bg-gray-950 text-gray-100 min-h-screen">
                <SessionWrapper>
                    {children}
                    <AskPyro />
                </SessionWrapper>
            </body>
        </html>
    )
}
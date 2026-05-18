const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/offline',
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    },
}

module.exports = withPWA(nextConfig)
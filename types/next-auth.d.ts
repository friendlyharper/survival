import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name?: string | null
            image?: string | null
            subscriptionTier: string
        }
    }

    interface User {
        id: string
        subscriptionTier?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        subscriptionTier?: string
    }
}

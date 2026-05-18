'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flame, Mail, Lock, Loader2, AlertTriangle } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const result = await signIn('credentials', {
            email: email.toLowerCase().trim(),
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.error) {
            setError('Invalid email or password')
            return
        }

        router.push('/knowledge-base')
        router.refresh()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="text-orange-500" size={28} />
                        <span className="text-white font-bold text-xl">Pyro&apos;s Survival Guide</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Sign in to access premium content</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4"
                >
                    {error && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-950 border border-red-800 px-3 py-2 text-sm text-red-300">
                            <AlertTriangle size={15} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={15} className="animate-spin" />
                                Signing in…
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-500 mt-4">
                    No account?{' '}
                    <Link href="/register" className="text-orange-400 hover:text-orange-300">
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    )
}

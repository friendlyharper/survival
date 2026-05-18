'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flame, Mail, Lock, User, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)

        if (password !== confirm) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() || undefined, email, password }),
            })

            const data = await res.json()
            setLoading(false)

            if (!res.ok) {
                setError(data.error || 'Registration failed')
                return
            }

            setSuccess(true)
            setTimeout(() => router.push('/login'), 2000)
        } catch {
            setLoading(false)
            setError('Could not connect to server')
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
                <div className="flex flex-col items-center gap-3 text-center">
                    <CheckCircle2 size={40} className="text-green-500" />
                    <h2 className="text-white font-bold text-xl">Account created!</h2>
                    <p className="text-zinc-400 text-sm">Redirecting you to sign in…</p>
                </div>
            </div>
        )
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
                    <p className="text-zinc-400 text-sm">Create your free account</p>
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
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                            Name <span className="text-zinc-500">(optional)</span>
                        </label>
                        <div className="relative">
                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                placeholder="Your name"
                                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

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
                                autoComplete="new-password"
                                placeholder="Min 8 characters"
                                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-zinc-300 mb-1">
                            Confirm password
                        </label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                id="confirm"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="Repeat password"
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
                                Creating account…
                            </>
                        ) : (
                            'Create free account'
                        )}
                    </button>

                    <p className="text-xs text-zinc-500 text-center">
                        Free accounts access all non-premium content. No credit card required.
                    </p>
                </form>

                <p className="text-center text-sm text-zinc-500 mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-orange-400 hover:text-orange-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

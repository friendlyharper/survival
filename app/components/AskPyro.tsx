'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Flame, Loader2, AlertTriangle } from 'lucide-react'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface AskPyroProps {
    articleContext?: string
}

export default function AskPyro({ articleContext }: AskPyroProps) {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                "I'm Pyro — your Colorado survival guide. Ask me anything about wilderness survival, emergency prep, or the article you're reading. What do you need to know?",
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
            inputRef.current?.focus()
        }
    }, [open, messages])

    async function sendMessage() {
        const text = input.trim()
        if (!text || loading) return

        setInput('')
        setError(null)
        setMessages((prev) => [...prev, { role: 'user', content: text }])
        setLoading(true)

        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    context: articleContext,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'AI service unavailable')
                return
            }

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.response },
            ])
        } catch {
            setError('Could not reach AI service. Check your connection.')
        } finally {
            setLoading(false)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating trigger button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-orange-700 px-4 py-3 text-white shadow-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
                    aria-label="Ask Pyro AI"
                >
                    <Flame size={18} />
                    <span className="text-sm font-semibold">Ask Pyro</span>
                </button>
            )}

            {/* Chat panel */}
            {open && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-orange-800 border-b border-orange-700">
                        <div className="flex items-center gap-2 text-white">
                            <Flame size={16} />
                            <span className="font-bold text-sm">Pyro — Survival AI</span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-orange-200 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-orange-700 text-white'
                                            : 'bg-zinc-800 text-zinc-100'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800 rounded-xl px-3 py-2">
                                    <Loader2
                                        size={16}
                                        className="text-orange-400 animate-spin"
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-start gap-2 rounded-xl bg-red-950 border border-red-800 px-3 py-2 text-xs text-red-300">
                                <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="px-3 py-3 bg-zinc-900 border-t border-zinc-700 flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a survival question…"
                            maxLength={500}
                            disabled={loading}
                            className="flex-1 rounded-lg bg-zinc-800 border border-zinc-600 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            className="rounded-lg bg-orange-700 px-3 py-2 text-white hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Send"
                        >
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Wifi, WifiOff, Flame } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOnline, setIsOnline] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        setIsOnline(navigator.onLine)
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    const navLinks = [
        { href: '/knowledge-base', label: 'Knowledge Base' },
        { href: '/faq', label: 'FAQ' },
        { href: '/quiz', label: 'Quiz' },
        { href: '/emergency', label: '⚠️ Emergency', className: 'text-red-400 font-bold' },
    ]

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

    return (
        <>
            {/* Offline banner */}
            {!isOnline && (
                <div className="bg-amber-600 text-white text-center py-2 px-4 text-sm font-semibold flex items-center justify-center gap-2">
                    <WifiOff size={16} />
                    Offline — All content available from cache
                </div>
            )}

            <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 text-orange-400 font-bold text-xl hover:text-orange-300 transition-colors min-h-[44px]">
                            <Flame size={24} className="text-orange-500" />
                            <span>Pyro&apos;s Guide</span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${link.className || ''} ${isActive(link.href)
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/search"
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </Link>

                            {/* Online indicator */}
                            <div className="hidden md:flex items-center gap-1 text-xs px-2 py-1 rounded-full border" aria-label={isOnline ? 'Online' : 'Offline'}>
                                {isOnline ? (
                                    <><Wifi size={12} className="text-green-400" /><span className="text-green-400">Online</span></>
                                ) : (
                                    <><WifiOff size={12} className="text-amber-400" /><span className="text-amber-400">Offline</span></>
                                )}
                            </div>

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-800 bg-gray-900">
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${link.className || ''} ${isActive(link.href)
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

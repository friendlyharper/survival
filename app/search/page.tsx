'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { searchContent } from '@/data/index'
import Navbar from '../components/Navbar'
import { Search, FileText, HelpCircle } from 'lucide-react'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const results = useMemo(() => searchContent(query), [query])

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-extrabold text-white mb-6">Search</h1>

                <div className="relative mb-8">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="search"
                        autoFocus
                        placeholder="Search all survival content..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-base"
                        autoComplete="off"
                    />
                </div>

                {query.trim().length < 2 && (
                    <p className="text-gray-500 text-center py-12">Type at least 2 characters to search</p>
                )}

                {query.trim().length >= 2 && results.length === 0 && (
                    <p className="text-gray-500 text-center py-12">No results for &ldquo;{query}&rdquo;</p>
                )}

                {results.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-4">{results.length} result{results.length !== 1 ? 's' : ''}</p>
                        {results.map((result) => (
                            <Link
                                key={`${result.type}-${result.id}`}
                                href={result.url}
                                className="card-hover flex items-start gap-4 p-4"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {result.type === 'article'
                                        ? <FileText size={16} className="text-orange-400" />
                                        : <HelpCircle size={16} className="text-blue-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-gray-500 capitalize">{result.type}</span>
                                        <span className="text-xs text-gray-600">·</span>
                                        <span className="text-xs text-orange-500 capitalize">{result.categoryId}</span>
                                    </div>
                                    <p className="font-semibold text-white leading-snug">{result.title}</p>
                                    <p className="text-gray-400 text-sm mt-1 leading-relaxed line-clamp-2">{result.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

'use client'

import { useState, useMemo } from 'react'
import { allFAQItems } from '@/data/index'
import { categories } from '@/data/categories'
import Navbar from '../components/Navbar'
import FAQAccordion from '../components/FAQAccordion'
import { HelpCircle, Search } from 'lucide-react'

export default function FAQPage() {
    const [query, setQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const filtered = useMemo(() => {
        let items = allFAQItems
        if (activeCategory) items = items.filter((f) => f.categoryId === activeCategory)
        if (query.trim().length >= 2) {
            const q = query.toLowerCase()
            items = items.filter(
                (f) =>
                    f.question.toLowerCase().includes(q) ||
                    f.answer.toLowerCase().includes(q) ||
                    f.tags.some((t) => t.toLowerCase().includes(q))
            )
        }
        return items
    }, [query, activeCategory])

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="flex items-center gap-3 mb-2">
                    <HelpCircle size={28} className="text-blue-400" />
                    <h1 className="text-3xl font-extrabold text-white">Survival FAQ</h1>
                </div>
                <p className="text-gray-400 mb-8">Search across all {allFAQItems.length} survival questions. Works offline.</p>

                {/* Search */}
                <div className="relative mb-6">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="search"
                        placeholder="Search questions, answers, or topics..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-base"
                        autoComplete="off"
                    />
                </div>

                {/* Category filter */}
                <div className="flex gap-2 flex-wrap mb-8">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[36px] ${activeCategory === null ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[36px] flex items-center gap-1 ${activeCategory === cat.id ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                            <span>{cat.emoji}</span>
                            <span className="hidden sm:inline">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Results */}
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <HelpCircle size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No matching questions found.</p>
                        <p className="text-sm mt-1">Try a different search or clear the filter.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 mb-4">{filtered.length} question{filtered.length !== 1 ? 's' : ''}</p>
                        <FAQAccordion items={filtered} />
                    </>
                )}
            </div>
        </div>
    )
}

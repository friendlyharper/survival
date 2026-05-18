import Link from 'next/link'
import { categories } from '@/data/categories'
import { getArticlesByCategory } from '@/data/index'
import Navbar from '../components/Navbar'
import { BookOpen } from 'lucide-react'

export const metadata = {
    title: "Knowledge Base — Pyro's Survival Guide",
    description: 'All Colorado survival guides organized by environment.',
}

export default function KnowledgeBasePage() {
    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={28} className="text-orange-400" />
                    <h1 className="text-3xl font-extrabold text-white">Knowledge Base</h1>
                </div>
                <p className="text-gray-400 mb-8">Colorado survival guides, organized by environment. All content works offline.</p>

                <div className="space-y-3">
                    {categories.map((cat) => {
                        const articles = getArticlesByCategory(cat.id)
                        return (
                            <div key={cat.id} className="card border border-gray-800">
                                <Link href={`/knowledge-base/${cat.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-gray-800/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {cat.emoji}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-white text-lg group-hover:text-orange-400 transition-colors">{cat.name}</h2>
                                            <p className="text-gray-400 text-sm">{cat.tagline}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <span className="text-sm text-orange-500 font-medium hidden sm:block">{articles.length} guide{articles.length !== 1 ? 's' : ''}</span>
                                        <svg className="text-gray-500 group-hover:text-orange-400 transition-colors" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

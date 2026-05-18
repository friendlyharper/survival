import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryById } from '@/data/categories'
import { getArticlesByCategory } from '@/data/index'
import Navbar from '../../components/Navbar'
import { AlertTriangle, Clock, ChevronRight } from 'lucide-react'

interface Props {
    params: { category: string }
}

const threatColors: Record<string, string> = {
    critical: 'threat-critical',
    high: 'threat-high',
    medium: 'threat-medium',
    low: 'threat-low',
}

export function generateStaticParams() {
    return ['alpine', 'winter', 'wildlife', 'forests', 'floods', 'desert', 'plains', 'urban', 'zombie'].map((id) => ({ category: id }))
}

export default function CategoryPage({ params }: Props) {
    const category = getCategoryById(params.category)
    if (!category) notFound()

    const articles = getArticlesByCategory(params.category)

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/knowledge-base" className="hover:text-orange-400 transition-colors">Knowledge Base</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-300">{category.name}</span>
                </nav>

                {/* Header */}
                <div className={`rounded-xl ${category.color} p-6 mb-8`}>
                    <div className="flex items-center gap-4">
                        <span className="text-5xl">{category.emoji}</span>
                        <div>
                            <h1 className={`text-3xl font-extrabold ${category.accentColor}`}>{category.name}</h1>
                            <p className={`mt-1 ${category.accentColor} opacity-80`}>{category.description}</p>
                        </div>
                    </div>
                </div>

                {/* Articles */}
                {articles.length === 0 ? (
                    <p className="text-gray-400">No guides yet for this category.</p>
                ) : (
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/knowledge-base/${params.category}/${article.id}`}
                                className="card-hover block p-5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide ${threatColors[article.threatLevel]}`}>
                                                {article.threatLevel === 'critical' && <AlertTriangle size={10} className="inline mr-1" />}
                                                {article.threatLevel}
                                            </span>
                                            <span className="text-xs text-gray-500 capitalize">{article.difficulty}</span>
                                            {article.isPremium && (
                                                <span className="text-xs bg-yellow-900 border border-yellow-700 text-yellow-300 px-2 py-0.5 rounded-full">Premium</span>
                                            )}
                                        </div>
                                        <h2 className="font-bold text-white text-lg leading-snug group-hover:text-orange-400">{article.title}</h2>
                                        <p className="text-gray-400 text-sm mt-1 leading-relaxed line-clamp-2">{article.summary}</p>
                                        <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                                            <Clock size={12} />
                                            <span>{article.timeToRead} min read</span>
                                            {article.faqItems.length > 0 && (
                                                <span className="ml-3 text-blue-500">{article.faqItems.length} FAQ{article.faqItems.length > 1 ? 's' : ''}</span>
                                            )}
                                        </div>
                                    </div>
                                    <svg className="text-gray-600 flex-shrink-0 mt-1" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

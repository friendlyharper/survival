import Link from 'next/link'
import { categories } from '@/data/categories'
import { emergencyQuickRef, getArticlesByCategory } from '@/data/index'
import CategoryCard from './components/CategoryCard'
import Navbar from './components/Navbar'
import { AlertTriangle, BookOpen, Brain, HelpCircle } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />

            {/* Emergency Quick Reference Banner */}
            <div className="bg-red-950 border-b-2 border-red-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
                        <h2 className="font-bold text-red-300 text-sm uppercase tracking-wider">Emergency Quick Reference</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {emergencyQuickRef.map((ref) => (
                            <Link
                                key={ref.url}
                                href={ref.url}
                                className="flex items-start gap-3 bg-red-900/50 hover:bg-red-900 border border-red-800 hover:border-red-600 rounded-lg p-3 transition-all min-h-[44px]"
                            >
                                <span className="text-xl flex-shrink-0">{ref.icon}</span>
                                <div>
                                    <div className="font-semibold text-red-200 text-sm">{ref.title}</div>
                                    <div className="text-red-300/80 text-xs mt-0.5 leading-snug">{ref.action}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-6xl mb-4">🔥</div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Pyro&apos;s Survival Guide
                    </h1>
                    <p className="text-orange-400 text-xl font-semibold mb-4">
                        To Keep the Flame Alive
                    </p>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Colorado-specific survival knowledge for every environment. Works fully offline.
                        Life-saving information when you need it most.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/knowledge-base" className="btn-primary text-base">
                            <BookOpen size={20} className="mr-2" />
                            Browse Knowledge Base
                        </Link>
                        <Link href="/quiz" className="btn-secondary text-base">
                            <Brain size={20} className="mr-2" />
                            Test Your Knowledge
                        </Link>
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                        Works fully offline — add to your home screen for emergencies
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Survival by Environment</h2>
                    <Link href="/knowledge-base" className="text-orange-400 hover:text-orange-300 text-sm font-medium min-h-[44px] flex items-center">
                        View all →
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => {
                        const count = getArticlesByCategory(cat.id).length
                        return <CategoryCard key={cat.id} category={cat} articleCount={count} />
                    })}
                </div>
            </section>

            {/* Quick actions */}
            <section className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/faq" className="card-hover p-6 flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                            <HelpCircle size={28} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Searchable FAQ</h3>
                            <p className="text-gray-400 text-sm mt-1">Browse and search answers to critical survival questions across all Colorado environments.</p>
                        </div>
                    </Link>
                    <Link href="/quiz" className="card-hover p-6 flex items-center gap-5">
                        <div className="w-14 h-14 bg-purple-900 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Brain size={28} className="text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Survival Quiz</h3>
                            <p className="text-gray-400 text-sm mt-1">Test your knowledge. Every wrong answer includes a real survival lesson that could save your life.</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-gray-900 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm space-y-2">
                    <p className="text-orange-400 font-semibold text-base">🔥 Pyro&apos;s Survival Guide</p>
                    <p>Colorado-specific survival knowledge. Always call 911 when possible.</p>
                    <p>Content based on FEMA, CDC, Colorado CAIC, Colorado SAR, and wilderness medicine doctrine.</p>
                </div>
            </footer>
        </div>
    )
}


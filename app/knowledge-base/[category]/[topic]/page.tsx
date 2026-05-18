import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryById } from '@/data/categories'
import { getArticleById } from '@/data/index'
import Navbar from '../../../components/Navbar'
import FAQAccordion from '../../../components/FAQAccordion'
import { AlertTriangle, CheckCircle, Lightbulb, ChevronRight, Clock, Lock } from 'lucide-react'

interface Props {
    params: { category: string; topic: string }
}

export default function ArticlePage({ params }: Props) {
    const article = getArticleById(params.topic)
    const category = getCategoryById(params.category)

    if (!article || !category) notFound()

    const threatColors: Record<string, string> = {
        critical: 'threat-critical',
        high: 'threat-high',
        medium: 'threat-medium',
        low: 'threat-low',
    }

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
                    <Link href="/knowledge-base" className="hover:text-orange-400 transition-colors">Knowledge Base</Link>
                    <ChevronRight size={14} />
                    <Link href={`/knowledge-base/${params.category}`} className="hover:text-orange-400 transition-colors">{category.name}</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-300 line-clamp-1">{article.title}</span>
                </nav>

                {/* Article header */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`text-sm px-3 py-1 rounded-full border font-bold uppercase tracking-wide ${threatColors[article.threatLevel]}`}>
                            {article.threatLevel === 'critical' && <AlertTriangle size={12} className="inline mr-1" />}
                            {article.threatLevel} threat
                        </span>
                        <span className="text-sm text-gray-500 capitalize">{article.difficulty}</span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{article.timeToRead} min read</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">{article.title}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">{article.summary}</p>
                </div>

                {/* Premium gate */}
                {article.isPremium && (
                    <div className="mb-10 bg-amber-950 border border-amber-600 rounded-xl p-6 text-center">
                        <Lock size={32} className="text-amber-400 mx-auto mb-3" />
                        <h2 className="text-xl font-bold text-amber-200 mb-2">Premium Content</h2>
                        <p className="text-amber-300 mb-5 text-sm leading-relaxed">
                            This advanced guide is part of the Pyro Premium tier — deeper tactics, advanced techniques, and expert-level field knowledge for serious preparedness.
                        </p>
                        <Link href="/login" className="btn-primary inline-flex">
                            Sign in to unlock
                        </Link>
                        <p className="text-amber-500 text-xs mt-3">Free account required · No credit card for basic access</p>
                    </div>
                )}

                {/* Steps */}
                {article.steps.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-white mb-5">Step-by-Step Actions</h2>
                        <div className="space-y-4">
                            {article.steps.map((step) => (
                                <div key={step.order} className="flex gap-4">
                                    <div className="step-number flex-shrink-0 mt-1">{step.order}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white">{step.action}</p>
                                        {step.detail && <p className="text-gray-400 text-sm mt-1 leading-relaxed">{step.detail}</p>}
                                        {step.warning && (
                                            <div className="warning-box mt-3 flex items-start gap-2">
                                                <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm font-semibold">{step.warning}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Warnings */}
                {(article.warnings?.length ?? 0) > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-red-400" />
                            Critical Warnings
                        </h2>
                        <div className="space-y-3">
                            {article.warnings!.map((warning, i) => (
                                <div key={i} className="warning-box flex items-start gap-3">
                                    <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm leading-relaxed">{warning}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Tips */}
                {article.tips.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Lightbulb size={20} className="text-yellow-400" />
                            Pro Tips
                        </h2>
                        <div className="space-y-3">
                            {article.tips.map((tip, i) => (
                                <div key={i} className="tip-box flex items-start gap-3">
                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {article.faqItems.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <FAQAccordion items={article.faqItems} />
                    </section>
                )}

                {/* Navigation */}
                <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row gap-3">
                    <Link href={`/knowledge-base/${params.category}`} className="btn-secondary flex-1 justify-center">
                        ← Back to {category.name}
                    </Link>
                    <Link href={`/quiz/${params.category}`} className="btn-primary flex-1 justify-center">
                        Test your knowledge →
                    </Link>
                </div>
            </div>
        </div>
    )
}

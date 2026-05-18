import Link from 'next/link'
import type { Category } from '@/data/types'

interface Props {
    category: Category
    articleCount?: number
}

export default function CategoryCard({ category, articleCount }: Props) {
    return (
        <Link
            href={`/knowledge-base/${category.id}`}
            className="card-hover block p-5 group"
        >
            <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {category.emoji}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg leading-tight group-hover:text-orange-400 transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {category.description}
                    </p>
                    {articleCount !== undefined && (
                        <p className="text-xs text-orange-500 mt-2 font-medium">
                            {articleCount} guide{articleCount !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                <div className="text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}

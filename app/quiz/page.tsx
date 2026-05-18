import Link from 'next/link'
import { categories } from '@/data/categories'
import { getQuizByCategory } from '@/data/index'
import Navbar from '../components/Navbar'
import { Brain } from 'lucide-react'

export const metadata = {
    title: "Survival Quiz — Pyro's Survival Guide",
}

export default function QuizPage() {
    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="flex items-center gap-3 mb-2">
                    <Brain size={28} className="text-purple-400" />
                    <h1 className="text-3xl font-extrabold text-white">Survival Quiz</h1>
                </div>
                <p className="text-gray-400 mb-8">
                    Test your survival knowledge. Every wrong answer reveals the correct technique — knowledge that could save your life.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => {
                        const count = getQuizByCategory(cat.id).length
                        return (
                            <Link
                                key={cat.id}
                                href={`/quiz/${cat.id}`}
                                className="card-hover p-5 flex items-center gap-4 group"
                            >
                                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                                    {cat.emoji}
                                </div>
                                <div>
                                    <h2 className="font-bold text-white group-hover:text-orange-400 transition-colors">{cat.name}</h2>
                                    <p className="text-sm text-gray-400 mt-0.5">{count} question{count !== 1 ? 's' : ''}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryById } from '@/data/categories'
import { getQuizByCategory } from '@/data/index'
import Navbar from '../../components/Navbar'
import QuizQuestionCard from '../../components/QuizQuestionCard'
import { Trophy, RotateCcw, BookOpen } from 'lucide-react'

interface Props {
    params: { category: string }
}

export default function CategoryQuizPage({ params }: Props) {
    const category = getCategoryById(params.category)
    if (!category) notFound()

    const questions = getQuizByCategory(params.category)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)
    const [started, setStarted] = useState(false)

    const handleNext = (correct: boolean) => {
        if (correct) setScore((s) => s + 1)
        if (currentIndex + 1 >= questions.length) {
            setDone(true)
        } else {
            setCurrentIndex((i) => i + 1)
        }
    }

    const restart = () => {
        setCurrentIndex(0)
        setScore(0)
        setDone(false)
        setStarted(true)
    }

    const percentage = Math.round((score / questions.length) * 100)

    const getScoreMessage = () => {
        if (percentage === 100) return { msg: 'Perfect! You are prepared.', color: 'text-green-400' }
        if (percentage >= 70) return { msg: 'Good — review what you missed.', color: 'text-yellow-400' }
        return { msg: 'Study up — this knowledge saves lives.', color: 'text-red-400' }
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-950">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-400">
                    <p>No quiz questions for this category yet.</p>
                    <Link href="/quiz" className="btn-secondary mt-6 inline-flex">← Back to Quiz</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {category.emoji}
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">{category.name} Quiz</h1>
                        <p className="text-gray-400 text-sm">{questions.length} questions</p>
                    </div>
                </div>

                {!started && !done && (
                    <div className="card p-8 text-center space-y-4">
                        <p className="text-gray-300 text-lg">Test your survival knowledge for <strong className="text-white">{category.name}</strong> scenarios.</p>
                        <p className="text-gray-400 text-sm">Every answer — right or wrong — includes the real survival explanation.</p>
                        <button onClick={() => setStarted(true)} className="btn-primary mx-auto">
                            Start Quiz
                        </button>
                    </div>
                )}

                {started && !done && (
                    <QuizQuestionCard
                        key={currentIndex}
                        question={questions[currentIndex]}
                        onNext={handleNext}
                        questionNumber={currentIndex + 1}
                        total={questions.length}
                    />
                )}

                {done && (
                    <div className="card p-8 text-center space-y-6">
                        <Trophy size={56} className="mx-auto text-yellow-400" />
                        <div>
                            <p className="text-5xl font-extrabold text-white">{score}/{questions.length}</p>
                            <p className="text-2xl font-bold text-white mt-1">{percentage}%</p>
                            <p className={`text-lg font-semibold mt-2 ${getScoreMessage().color}`}>{getScoreMessage().msg}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={restart} className="btn-secondary gap-2">
                                <RotateCcw size={18} />
                                Try Again
                            </button>
                            <Link href={`/knowledge-base/${params.category}`} className="btn-primary gap-2">
                                <BookOpen size={18} />
                                Study the Guides
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import type { QuizQuestion } from '@/data/types'
import { CheckCircle, XCircle } from 'lucide-react'

interface Props {
    question: QuizQuestion
    onNext: (correct: boolean) => void
    questionNumber: number
    total: number
}

export default function QuizQuestionCard({ question, onNext, questionNumber, total }: Props) {
    const [selected, setSelected] = useState<number | null>(null)
    const answered = selected !== null
    const isCorrect = selected === question.correctIndex

    return (
        <div className="card p-6 space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Question {questionNumber} of {total}</span>
                <span className="capitalize text-orange-400">{question.difficulty}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(questionNumber / total) * 100}%` }}
                />
            </div>

            {/* Question */}
            <p className="text-lg font-semibold text-white leading-snug">{question.question}</p>

            {/* Options */}
            <div className="space-y-3">
                {question.options.map((option, idx) => {
                    let style = 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600'
                    if (answered) {
                        if (idx === question.correctIndex) {
                            style = 'bg-green-900 border-green-600 text-green-200'
                        } else if (idx === selected) {
                            style = 'bg-red-900 border-red-600 text-red-200'
                        } else {
                            style = 'bg-gray-800 border-gray-700 text-gray-500 opacity-60'
                        }
                    }

                    return (
                        <button
                            key={idx}
                            disabled={answered}
                            onClick={() => setSelected(idx)}
                            className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all ${style} min-h-[56px] flex items-start gap-3`}
                        >
                            <span className="font-bold text-sm w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 mt-0.5">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-snug">{option}</span>
                        </button>
                    )
                })}
            </div>

            {/* Explanation after answer */}
            {answered && (
                <div className={`rounded-xl p-5 border-2 space-y-2 ${isCorrect ? 'bg-green-950 border-green-700' : 'bg-red-950 border-red-700'}`}>
                    <div className="flex items-center gap-2">
                        {isCorrect
                            ? <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                            : <XCircle size={20} className="text-red-400 flex-shrink-0" />
                        }
                        <span className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                        </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">{question.explanation}</p>
                </div>
            )}

            {/* Next button */}
            {answered && (
                <button
                    onClick={() => onNext(isCorrect)}
                    className="btn-primary w-full"
                >
                    {questionNumber < total ? 'Next Question →' : 'See Results'}
                </button>
            )}
        </div>
    )
}

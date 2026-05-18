import { alpineArticles, alpineQuiz } from './content/alpine'
import { winterArticles, winterQuiz } from './content/winter'
import { wildlifeArticles, wildlifeQuiz } from './content/wildlife'
import { forestArticles, forestQuiz } from './content/forests'
import { floodArticles, floodQuiz } from './content/floods'
import { desertArticles, desertQuiz } from './content/desert'
import { plainsArticles, plainsQuiz } from './content/plains'
import { urbanArticles, urbanQuiz } from './content/urban'
import { zombieArticles, zombieQuiz } from './content/zombie'
import type { Article, FAQItem, QuizQuestion, SearchResult } from './types'

export const allArticles: Article[] = [
    ...alpineArticles,
    ...winterArticles,
    ...wildlifeArticles,
    ...forestArticles,
    ...floodArticles,
    ...desertArticles,
    ...plainsArticles,
    ...urbanArticles,
    ...zombieArticles,
]

export const allQuestions: QuizQuestion[] = [
    ...alpineQuiz,
    ...winterQuiz,
    ...wildlifeQuiz,
    ...forestQuiz,
    ...floodQuiz,
    ...desertQuiz,
    ...plainsQuiz,
    ...urbanQuiz,
    ...zombieQuiz,
]

export const allFAQItems: FAQItem[] = allArticles.flatMap((a) => a.faqItems)

export function getArticlesByCategory(categoryId: string): Article[] {
    return allArticles.filter((a) => a.categoryId === categoryId)
}

export function getArticleById(id: string): Article | undefined {
    return allArticles.find((a) => a.id === id)
}

export function getQuizByCategory(categoryId: string): QuizQuestion[] {
    return allQuestions.filter((q) => q.categoryId === categoryId)
}

export function getFAQByCategory(categoryId: string): FAQItem[] {
    return allFAQItems.filter((f) => f.categoryId === categoryId)
}

export function searchContent(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) return []
    const q = query.toLowerCase().trim()

    const articleResults: SearchResult[] = allArticles
        .filter(
            (a) =>
                a.title.toLowerCase().includes(q) ||
                a.summary.toLowerCase().includes(q) ||
                a.tips.some((t) => t.toLowerCase().includes(q)) ||
                (a.warnings ?? []).some((w) => w.toLowerCase().includes(q))
        )
        .map((a) => ({
            type: 'article' as const,
            id: a.id,
            categoryId: a.categoryId,
            title: a.title,
            excerpt: a.summary,
            url: `/knowledge-base/${a.categoryId}/${a.id}`,
        }))

    const faqResults: SearchResult[] = allFAQItems
        .filter(
            (f) =>
                f.question.toLowerCase().includes(q) ||
                f.answer.toLowerCase().includes(q) ||
                f.tags.some((t) => t.toLowerCase().includes(q))
        )
        .map((f) => ({
            type: 'faq' as const,
            id: f.id,
            categoryId: f.categoryId,
            title: f.question,
            excerpt: f.answer.substring(0, 150) + (f.answer.length > 150 ? '...' : ''),
            url: `/faq#${f.id}`,
        }))

    return [...articleResults, ...faqResults].slice(0, 20)
}

// Emergency quick reference — shown at top of home page
export const emergencyQuickRef = [
    { icon: '🏕️', title: 'Lost in wilderness', action: 'STOP. Signal with 3 whistle blasts. Shelter before dark.', url: '/knowledge-base/forests/forests-lost' },
    { icon: '❄️', title: 'Hypothermia signs', action: 'Shivering stopped + confused = emergency. Remove wet clothes. Rewarm core.', url: '/knowledge-base/winter/winter-hypothermia' },
    { icon: '⛰️', title: 'Altitude sickness', action: 'Headache + nausea at altitude = AMS. Stop ascending. Descend if worsening.', url: '/knowledge-base/alpine/alpine-altitude-sickness' },
    { icon: '🌊', title: 'Flash flood', action: 'Rumble upstream? Move UP and LATERAL immediately. Do NOT go downstream.', url: '/knowledge-base/floods/floods-flash-flood' },
    { icon: '🐻', title: 'Bear attack (black bear)', action: 'FIGHT BACK. Target nose and eyes. Never play dead with a black bear.', url: '/knowledge-base/wildlife/wildlife-bear' },
    { icon: '🌡️', title: 'Heat stroke', action: 'Hot DRY skin + confusion = emergency. Cool with water NOW. Call 911.', url: '/knowledge-base/desert/desert-heat' },
]

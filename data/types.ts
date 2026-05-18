export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical'

export interface Category {
    id: string
    name: string
    emoji: string
    color: string          // Tailwind bg class
    accentColor: string    // Tailwind text/border class
    description: string
    tagline: string
    priority: number       // lower = shown first
}

export interface Step {
    order: number
    action: string
    detail?: string
    warning?: string
}

export interface FAQItem {
    id: string
    question: string
    answer: string
    categoryId: string
    tags: string[]
}

export interface Article {
    id: string
    categoryId: string
    title: string
    summary: string
    difficulty: DifficultyLevel
    threatLevel: ThreatLevel
    timeToRead: number       // minutes
    isPremium: boolean
    steps: Step[]
    tips: string[]
    warnings: string[]
    faqItems: FAQItem[]
    relatedIds: string[]     // other article ids
}

export interface QuizQuestion {
    id: string
    categoryId: string
    question: string
    options: string[]
    correctIndex: number
    explanation: string      // shown after answer — always a real survival tip
    difficulty: DifficultyLevel
}

export interface SearchResult {
    type: 'article' | 'faq'
    id: string
    categoryId: string
    title: string
    excerpt: string
    url: string
}

'use client'

import { useState } from 'react'
import type { FAQItem } from '@/data/types'
import { ChevronDown } from 'lucide-react'

interface Props {
    items: FAQItem[]
}

export default function FAQAccordion({ items }: Props) {
    const [openId, setOpenId] = useState<string | null>(null)

    return (
        <div className="space-y-2">
            {items.map((item) => {
                const isOpen = openId === item.id
                return (
                    <div key={item.id} id={item.id} className="card border border-gray-800">
                        <button
                            className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 min-h-[56px] hover:bg-gray-800/50 transition-colors"
                            onClick={() => setOpenId(isOpen ? null : item.id)}
                            aria-expanded={isOpen}
                        >
                            <span className="font-semibold text-white text-base leading-snug">{item.question}</span>
                            <ChevronDown
                                size={20}
                                className={`flex-shrink-0 text-orange-400 transition-transform mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {isOpen && (
                            <div className="px-5 pb-5 pt-1 border-t border-gray-800">
                                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                                {item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

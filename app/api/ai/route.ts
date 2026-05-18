import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'

const SYSTEM_PROMPT = `You are Pyro, a Colorado-specific wilderness and urban survival expert. Your knowledge is grounded in:
- Rocky Mountain alpine environments (elevation, altitude sickness, avalanche)
- Colorado's 9 survival environments: alpine, winter, wildlife, forests, floods, desert, plains, urban, and long-term societal disruption
- Colorado-specific resources: CAIC (avalanche center), CPW (Colorado Parks and Wildlife), CSP (Colorado State Patrol *277), ready.colorado.gov, CDPHE
- FEMA/CDC emergency management doctrine
- Practical, actionable survival information

Guidelines:
- Be direct and concise. Lives may depend on your advice.
- Always prioritize immediate life threats first (bleeding, breathing, temperature)
- Reference Colorado-specific resources, phone numbers, and agencies when relevant
- For serious emergencies, always recommend calling 911 when possible
- Do not diagnose medical conditions — describe symptoms and urge professional care
- Treat all emergency scenarios (including societal collapse) with seriousness, per FEMA doctrine`

export async function POST(request: NextRequest) {
    let body: { message?: string; context?: string; model?: string }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { message, context, model = 'llama3' } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    if (message.length > 2000) {
        return NextResponse.json({ error: 'message too long' }, { status: 400 })
    }

    const prompt = context
        ? `${SYSTEM_PROMPT}\n\nContext from article: ${context}\n\nUser question: ${message}`
        : `${SYSTEM_PROMPT}\n\nUser question: ${message}`

    try {
        const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                prompt,
                stream: false,
            }),
        })

        if (!ollamaResponse.ok) {
            if (ollamaResponse.status === 404) {
                return NextResponse.json(
                    { error: `Model '${model}' not found. Run: ollama pull ${model}` },
                    { status: 503 }
                )
            }
            return NextResponse.json(
                { error: 'AI service unavailable' },
                { status: 503 }
            )
        }

        const data = await ollamaResponse.json()
        return NextResponse.json({ response: data.response })
    } catch (err) {
        // Ollama not running — return user-friendly message, not server error
        const isConnectionRefused =
            err instanceof Error &&
            (err.message.includes('ECONNREFUSED') || err.message.includes('fetch failed'))

        if (isConnectionRefused) {
            return NextResponse.json(
                {
                    error:
                        'AI assistant is offline. Start Ollama locally to enable Pyro AI responses.',
                },
                { status: 503 }
            )
        }

        return NextResponse.json({ error: 'AI service error' }, { status: 500 })
    }
}

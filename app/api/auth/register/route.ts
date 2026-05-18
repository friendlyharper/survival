import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    let body: { name?: string; email?: string; password?: string }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { name, email, password } = body

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (password.length < 8) {
        return NextResponse.json(
            { error: 'Password must be at least 8 characters' },
            { status: 400 }
        )
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    })

    if (existing) {
        return NextResponse.json(
            { error: 'An account with this email already exists' },
            { status: 409 }
        )
    }

    const hashed = await bcrypt.hash(password, 12)

    await prisma.user.create({
        data: {
            name: name?.trim() || null,
            email: normalizedEmail,
            password: hashed,
        },
    })

    return NextResponse.json({ success: true }, { status: 201 })
}

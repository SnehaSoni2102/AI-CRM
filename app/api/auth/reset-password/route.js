import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL
    if (!API_BASE) {
      console.error('API base URL is not configured. Set NEXT_PUBLIC_API_BASE_URL or API_BASE_URL.')
      return NextResponse.json({ success: false, error: 'API base URL not configured' }, { status: 500 })
    }

    const targetUrl = `${API_BASE.replace(/\/$/, '')}/api/auth/reset-password`

    const resp = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json().catch(() => ({}))

    return NextResponse.json(data, { status: resp.status })
  } catch (error) {
    console.error('Error proxying reset-password:', error)
    return NextResponse.json({ success: false, error: 'Proxy error' }, { status: 500 })
  }
}



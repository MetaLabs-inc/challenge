import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { nextUrl, geo } = req
  nextUrl.searchParams.set('country', geo?.country ?? 'fallback')

  NextResponse.rewrite(nextUrl)
  NextResponse.next()
}


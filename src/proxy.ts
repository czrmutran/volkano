import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session')
  const isLoggedIn = !!sessionCookie?.value

  // Se tentar acessar /admin sem estar logado, redireciona para /login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Se tentar acessar /login já estando logado, redireciona para /admin
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}

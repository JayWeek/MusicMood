import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 1. Initialize the Server Client dynamically for this single request cycle
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 2. Fetch the current authenticated user session securely from token headers
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup');
  
  // Define our application root page or landing page path if not logging in
  const isRootPage = url.pathname === '/';

  // 3. SECURE ROUTE GUARD ENFORCEMENT
  if (!user) {
    // If user is NOT logged in, and tries to access anything other than login/signup/root
    if (!isAuthPage && !isRootPage) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } else {
    // If the user IS logged in, and tries to visit auth pages, bounce them straight to dashboard
    if (isAuthPage) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

/**
 * Configure the Middleware to trigger ONLY on application routes.
 * This explicitly ignores static assets, images, icons, and Next.js internal files.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

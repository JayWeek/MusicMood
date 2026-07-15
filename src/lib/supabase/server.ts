import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Factory function to instantiate a secure, server-side Supabase client.
 * This client runs strictly inside Next.js Server Components, Server Actions, and Route Handlers.
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method can be safely ignored if middleware 
            // is actively handling session cookie rewriting.
          }
        },
      },
    }
  );
};

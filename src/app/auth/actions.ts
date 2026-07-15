'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type AuthResponse = {
  success: boolean;
  error?: string;
};

/**
 * Handles secure server-side email and password user registration.
 */
export async function signUp(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Directs Supabase where to redirect users after email confirmation if enabled
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Handles secure server-side user authentication and login session creation.
 */
export async function login(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Clear server caches to guarantee the router recognizes the fresh authenticated session cookies
  revalidatePath('/', 'layout');
  
  // Bounce the authenticated user directly into their protected workspace
  redirect('/dashboard');
}

/**
 * Destroys the active session token cookies safely from the server context.
 */
export async function logout() {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  revalidatePath('/', 'layout');
  redirect('/login');
}

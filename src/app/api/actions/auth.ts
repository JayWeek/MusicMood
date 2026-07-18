'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { loginSchema, signupSchema } from '../schema/auth';

export type AuthErrors = Partial<
  Record<'name' | 'email' | 'password' | 'confirmPassword', string[]>
>;

export type AuthResponse = {
  success: boolean;
  errors?: AuthErrors;
  message?: string;
};

/**
 * Handles secure server-side email and password user registration.
 */
export async function signUp(
  _prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  const result = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { full_name: result.data.name },
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: 'Check your email to confirm your account.',
  };
}

/**
 * Handles secure server-side user authentication and login session creation.
 */
export async function login(
  _prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if(!result.success){
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return { success: false, message: error.message };
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

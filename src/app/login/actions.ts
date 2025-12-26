'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export async function loginAction(prevState: any, formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Preencha todos os campos.' }
  }

  // Criar cliente Supabase diretamente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Verificar credenciais via RPC (encriptação no banco)
    const { data: userId, error } = await supabase.rpc('verify_admin_password', {
      email_input: email,
      password_input: password
    })

    if (error || !userId) {
      return { error: 'Credenciais inválidas.' }
    }

    // Login bem-sucedido
    const cookieStore = await cookies()
    cookieStore.set('admin_session', JSON.stringify({ email, id: userId }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
      path: '/',
    })

    return { success: true }
  } catch (err) {
    console.error('Login error:', err)
    return { error: 'Erro interno ao processar login.' }
  }
}

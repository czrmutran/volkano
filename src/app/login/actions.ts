'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

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
    // Buscar usuário pelo email
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return { error: 'Credenciais inválidas.' }
    }

    // Verificar senha com bcrypt
    const isValid = await bcrypt.compare(password, data.password)

    if (!isValid) {
      return { error: 'Credenciais inválidas.' }
    }

    // Login bem-sucedido
    const cookieStore = await cookies()
    cookieStore.set('admin_session', JSON.stringify({ email: data.email, id: data.id }), {
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

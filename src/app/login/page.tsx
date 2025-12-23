"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header-section";
import FooterSection from "../../components/footer";
import { Lock, Loader2 } from "lucide-react";
import { loginAction } from "./actions";
import { useEffect } from "react";

const initialState: { error?: string; success?: boolean } = {
  success: false,
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
    }
  }, [state.success, router]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-orange-500" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase">Acesso Admin</h1>
            <p className="text-white/50 text-sm text-center mt-2">
              Faça login para gerenciar os produtos.
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-2 uppercase">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                placeholder="admin@volkano.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-2 uppercase">Senha</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-500 text-black font-bold py-3 rounded-full hover:bg-orange-400 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : "ENTRAR"}
            </button>
          </form>
        </div>
      </main>
      <FooterSection />
    </>
  );
}

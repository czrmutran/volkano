"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Create a server-side client with Service Role Key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getOrcamentos() {
  // Check if user is authenticated (via custom cookie)
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("orcamentos_info")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching orcamentos:", error);
    return [];
  }
}

export async function getProdutos() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching produtos:", error);
    return [];
  }
}

export async function deleteProduto(id: string) {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const { error } = await supabaseAdmin
      .from("produtos")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting produto:", error);
    return { success: false, error };
  }
}

"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Validate env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in server actions");
}

// Create a server-side client with Service Role Key to bypass RLS
const supabaseAdmin = createClient(
  supabaseUrl || "",
  supabaseServiceKey || "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export async function getOrcamentos() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      console.warn("Unauthorized: No admin session found");
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from("orcamentos_info")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error (getOrcamentos):", error);
      return [];
    }

    // Ensure data is serializable
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Server Action Error (getOrcamentos):", error);
    return [];
  }
}

export async function getProdutos() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      console.warn("Unauthorized: No admin session found");
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error (getProdutos):", error);
      return [];
    }

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Server Action Error (getProdutos):", error);
    return [];
  }
}

export async function deleteProduto(id: string) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const { error } = await supabaseAdmin
      .from("produtos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Error (deleteProduto):", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Error (deleteProduto):", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}

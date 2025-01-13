import { createClient } from "@supabase/supabase-js";

const API = process.env.NEXT_PUBLIC_SUPABASE_API;
export const supabase = createClient(
  "https://gsmlzhmnztjrvkcoypwe.supabase.co",
  String(API)
);

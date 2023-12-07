import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
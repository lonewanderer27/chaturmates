import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (supabaseUrl === undefined) {
  throw new Error("NO URL")
}
if (supabaseAnonKey === undefined) {
  throw new Error("NO KEY")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
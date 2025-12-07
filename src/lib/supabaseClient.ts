import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://odikyxhechlejzfuorpk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lHz0k4gHLQyUHPyLPzoMFg_5AEMm-H7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ljbuzkmkghhxiniluugb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqYnV6a21rZ2hoeGluaWx1dWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNTQ3NDgsImV4cCI6MjA1MDczMDc0OH0.vEp1w_1qwBNH--DKq9ymeug83tVN0bQhV7mmujZLwcE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
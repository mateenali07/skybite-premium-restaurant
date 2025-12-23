const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("FATAL ERROR: SUPABASE_URL or SUPABASE_ANON_KEY is missing in environment variables!");
}

// Initialize client (will handle undefined gracefully if needed, or we check here)
const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
            insert: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
            eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }) })
        })
    };

module.exports = supabase;

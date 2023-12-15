import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rjbjxmwxdyoywmcldhak.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYmp4bXd4ZHlveXdtY2xkaGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2NDM0MTcsImV4cCI6MjAxODIxOTQxN30._gGAZsJOMTTy9CAm6s4BO89E4DHlJZBTV92SWLdcFjI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

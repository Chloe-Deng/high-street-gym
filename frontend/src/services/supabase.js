import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aiwhyounhqckdwspiwjw.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpd2h5b3VuaHFja2R3c3Bpd2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NjE4NzIsImV4cCI6MjAyMzAzNzg3Mn0.9RC989y8zgpxHYncDbWVwSy571SXgBLxCwoIiIMg97Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_KEY);

export async function getIsFeatureEnabled(): Promise<boolean> {
  const { data, error } = await supabase.from("features").select("enabled").eq("name", "music").single();
  if (error) {
    console.warn("Error fetching feature status:", error);
    return false;
  }
  return data?.enabled ?? false;
}

async function getCount(): Promise<number | null> {
  const { data, error } = await supabase.from("stats").select("views").eq("id", 1).single();
  if (error) {
    console.warn("Error fetching pageviews:", error);
    return null;
  }
  return data?.views ?? null;
}

export async function updateCount(): Promise<number | null> {
  const currentCount = await getCount();
  if (currentCount === null) {
    return null;
  }
  const newCount = currentCount + 1;
  const { error } = await supabase.from("stats").update({ views: newCount }).eq("id", 1);

  if (error) {
    console.warn("Error updating pageviews:", error);
    return null;
  }
  return newCount;
}

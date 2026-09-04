import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DemoCategory, DemoItem } from "@/types/demos";
import { SEED_CATEGORIES, SEED_DEMOS } from "@/content/demo-seed-data";

// Read public environment variables injected by Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  try {
    new URL(supabaseUrl);
    return supabaseUrl.includes("supabase.co") || supabaseUrl.includes("localhost") || supabaseUrl.includes("127.0.0.1");
  } catch {
    return false;
  }
}

// Client singleton
let clientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (clientInstance) return clientInstance;
  if (isSupabaseConfigured()) {
    clientInstance = createClient(supabaseUrl!, supabaseAnonKey!);
    return clientInstance;
  }
  return null;
}

export const supabase = getSupabase();

// In-memory mutable fallback for local testing when Supabase credentials are not yet configured
let localCategories: DemoCategory[] = [...SEED_CATEGORIES];
let localDemos: DemoItem[] = [...SEED_DEMOS];

// ── Public Data Fetchers ───────────────────────────────────────────────────────

export async function getCategories(): Promise<DemoCategory[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("demo_categories")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) {
        const dbSlugs = new Set(data.map((c: any) => c.slug));
        const missingSeed = SEED_CATEGORIES.filter((c) => c.published && !dbSlugs.has(c.slug));
        return [...(data as DemoCategory[]), ...missingSeed];
      }
    } catch (err) {
      console.warn("[supabase] error fetching categories, using fallback:", err);
    }
  }
  return localCategories.filter((c) => c.published);
}

export async function getAllCategoriesAdmin(): Promise<DemoCategory[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("demo_categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) {
        const dbSlugs = new Set(data.map((c: any) => c.slug));
        const missingSeed = SEED_CATEGORIES.filter((c) => !dbSlugs.has(c.slug));
        return [...(data as DemoCategory[]), ...missingSeed];
      }
    } catch (err) {
      console.warn("[supabase] error fetching all categories:", err);
    }
  }
  return [...localCategories];
}

export async function getDemos(): Promise<DemoItem[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("demos")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) {
        const dbUrls = new Set(data.map((d: any) => (d.demo_url || "").trim().toLowerCase()));
        const dbSlugs = new Set(data.map((d: any) => d.slug));
        const missingSeed = SEED_DEMOS.filter((d) => {
          if (!d.published) return false;
          const urlMatch = d.demo_url && dbUrls.has(d.demo_url.trim().toLowerCase());
          const slugMatch = dbSlugs.has(d.slug);
          return !urlMatch && !slugMatch;
        });
        return [...(data as DemoItem[]), ...missingSeed];
      }
    } catch (err) {
      console.warn("[supabase] error fetching demos, using fallback:", err);
    }
  }
  return localDemos.filter((d) => d.published);
}

export async function getAllDemosAdmin(): Promise<DemoItem[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("demos")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) {
        const dbUrls = new Set(data.map((d: any) => (d.demo_url || "").trim().toLowerCase()));
        const dbSlugs = new Set(data.map((d: any) => d.slug));
        const missingSeed = SEED_DEMOS.filter((d) => {
          const urlMatch = d.demo_url && dbUrls.has(d.demo_url.trim().toLowerCase());
          const slugMatch = dbSlugs.has(d.slug);
          return !urlMatch && !slugMatch;
        });
        return [...(data as DemoItem[]), ...missingSeed];
      }
    } catch (err) {
      console.warn("[supabase] error fetching all demos:", err);
    }
  }
  return [...localDemos];
}

// ── Admin Mutation Methods ───────────────────────────────────────────────────

export async function saveCategory(category: Partial<DemoCategory> & { name: string; slug: string }): Promise<{ data: DemoCategory | null; error: Error | null }> {
  const sb = getSupabase();
  if (sb) {
    if (category.id) {
      const { data, error } = await sb
        .from("demo_categories")
        .update({
          name: category.name,
          slug: category.slug,
          description: category.description,
          parent_id: category.parent_id ?? null,
          icon: category.icon,
          display_order: category.display_order ?? 0,
          published: category.published ?? true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", category.id)
        .select()
        .single();
      return { data: data as DemoCategory, error: error ? new Error(error.message) : null };
    } else {
      const { data, error } = await sb
        .from("demo_categories")
        .insert({
          name: category.name,
          slug: category.slug,
          description: category.description,
          parent_id: category.parent_id ?? null,
          icon: category.icon,
          display_order: category.display_order ?? 0,
          published: category.published ?? true,
        })
        .select()
        .single();
      return { data: data as DemoCategory, error: error ? new Error(error.message) : null };
    }
  }

  // Fallback in-memory
  if (category.id) {
    localCategories = localCategories.map((c) => (c.id === category.id ? { ...c, ...category } as DemoCategory : c));
    return { data: localCategories.find((c) => c.id === category.id) ?? null, error: null };
  } else {
    const newCat: DemoCategory = {
      id: "cat-" + Date.now(),
      name: category.name,
      slug: category.slug,
      description: category.description ?? null,
      parent_id: category.parent_id ?? null,
      icon: category.icon ?? null,
      display_order: category.display_order ?? localCategories.length + 1,
      published: category.published ?? true,
      created_at: new Date().toISOString(),
    };
    localCategories.push(newCat);
    return { data: newCat, error: null };
  }
}

export async function deleteCategory(id: string): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("demo_categories").delete().eq("id", id);
    return { error: error ? new Error(error.message) : null };
  }
  localCategories = localCategories.filter((c) => c.id !== id && c.parent_id !== id);
  localDemos = localDemos.filter((d) => d.category_id !== id);
  return { error: null };
}

export async function saveDemo(demo: Partial<DemoItem> & { title: string; slug: string; demo_url: string; category_id: string; description: string; technology: string }): Promise<{ data: DemoItem | null; error: Error | null }> {
  const sb = getSupabase();
  if (sb) {
    if (demo.id) {
      const { data, error } = await sb
        .from("demos")
        .update({
          title: demo.title,
          slug: demo.slug,
          description: demo.description,
          category_id: demo.category_id,
          demo_url: demo.demo_url,
          thumbnail_url: demo.thumbnail_url,
          technology: demo.technology,
          stack: demo.stack ?? [],
          featured: demo.featured ?? false,
          published: demo.published ?? true,
          display_order: demo.display_order ?? 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", demo.id)
        .select()
        .single();
      return { data: data as DemoItem, error: error ? new Error(error.message) : null };
    } else {
      const { data, error } = await sb
        .from("demos")
        .insert({
          title: demo.title,
          slug: demo.slug,
          description: demo.description,
          category_id: demo.category_id,
          demo_url: demo.demo_url,
          thumbnail_url: demo.thumbnail_url,
          technology: demo.technology,
          stack: demo.stack ?? [],
          featured: demo.featured ?? false,
          published: demo.published ?? true,
          display_order: demo.display_order ?? 0,
        })
        .select()
        .single();
      return { data: data as DemoItem, error: error ? new Error(error.message) : null };
    }
  }

  // Fallback in-memory
  if (demo.id) {
    localDemos = localDemos.map((d) => (d.id === demo.id ? { ...d, ...demo } as DemoItem : d));
    return { data: localDemos.find((d) => d.id === demo.id) ?? null, error: null };
  } else {
    const newDemo: DemoItem = {
      id: "demo-" + Date.now(),
      title: demo.title,
      slug: demo.slug,
      description: demo.description,
      category_id: demo.category_id,
      demo_url: demo.demo_url,
      thumbnail_url: demo.thumbnail_url ?? "/hero-main.png",
      technology: demo.technology,
      stack: demo.stack ?? [],
      featured: demo.featured ?? false,
      published: demo.published ?? true,
      display_order: demo.display_order ?? localDemos.length + 1,
      created_at: new Date().toISOString(),
    };
    localDemos.push(newDemo);
    return { data: newDemo, error: null };
  }
}

export async function deleteDemo(id: string): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("demos").delete().eq("id", id);
    return { error: error ? new Error(error.message) : null };
  }
  localDemos = localDemos.filter((d) => d.id !== id);
  return { error: null };
}

// ── Supabase Storage Upload ──────────────────────────────────────────────────

export async function uploadThumbnail(file: File): Promise<{ url: string | null; error: Error | null }> {
  const sb = getSupabase();
  if (!sb) {
    // Fallback: create object URL for local session
    return { url: URL.createObjectURL(file), error: null };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await sb.storage
      .from("demo-thumbnails")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const { data } = sb.storage.from("demo-thumbnails").getPublicUrl(filePath);
    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    console.error("[storage] thumbnail upload failed:", err);
    return { url: null, error: new Error(err.message || "Upload failed") };
  }
}

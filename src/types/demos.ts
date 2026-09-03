export interface DemoCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  icon?: string | null;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DemoItem {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url?: string | null;
  demo_url: string;
  technology: string;
  stack: string[];
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryWithHierarchy extends DemoCategory {
  children?: DemoCategory[];
  demoCount?: number;
}

export interface BreadcrumbItem {
  id: string;
  label: string;
  slug?: string;
  type: "root" | "category" | "subcategory";
}

export type DemoViewMode = "grid" | "list";

export type DemoQuickFilter = "all" | "wordpress" | "custom" | "featured" | "recent";

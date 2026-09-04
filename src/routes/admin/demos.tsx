import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  getSupabase,
  isSupabaseConfigured,
  getAllCategoriesAdmin,
  getAllDemosAdmin,
  saveCategory,
  deleteCategory,
  saveDemo,
  deleteDemo,
  uploadThumbnail,
} from "@/lib/supabase";
import type { DemoCategory, DemoItem } from "@/types/demos";
import {
  Folder,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Star,
  CheckCircle2,
  XCircle,
  LogOut,
  LayoutGrid,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin/demos")({
  head: () => ({
    meta: [
      { title: "Demo Library Management — TechVRS Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDemosPage,
});

function AdminDemosPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<DemoCategory[]>([]);
  const [demos, setDemos] = useState<DemoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"demos" | "categories">("demos");

  // Auth state
  const isConfigured = isSupabaseConfigured();
  const [isAuthenticated, setIsAuthenticated] = useState(!isConfigured); // In offline dev mode allow preview

  // Demo Modal State
  const [editingDemo, setEditingDemo] = useState<Partial<DemoItem> | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [savingDemo, setSavingDemo] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Category Modal State
  const [editingCategory, setEditingCategory] = useState<Partial<DemoCategory> | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  // Load data & session
  useEffect(() => {
    async function init() {
      const sb = getSupabase();
      if (sb) {
        const { data } = await sb.auth.getSession();
        if (!data.session) {
          navigate({ to: "/admin/login" });
          return;
        }
        setIsAuthenticated(true);
      }

      try {
        const [cats, items] = await Promise.all([
          getAllCategoriesAdmin(),
          getAllDemosAdmin(),
        ]);
        setCategories(cats);
        setDemos(items);
      } catch (err) {
        console.error("[admin] error loading data:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [navigate]);

  async function handleLogout() {
    const sb = getSupabase();
    if (sb) {
      await sb.auth.signOut();
    }
    navigate({ to: "/admin/login" });
  }

  // Reload data
  async function refreshData() {
    const [cats, items] = await Promise.all([
      getAllCategoriesAdmin(),
      getAllDemosAdmin(),
    ]);
    setCategories(cats);
    setDemos(items);
  }

  // ── Demo Actions ──
  function openAddDemo() {
    setEditingDemo({
      title: "",
      slug: "",
      description: "",
      category_id: categories[0]?.id || "",
      demo_url: "https://",
      thumbnail_url: "",
      technology: "Custom / Next.js",
      stack: ["React", "TypeScript", "Tailwind CSS"],
      featured: false,
      published: true,
      display_order: demos.length + 1,
    });
    setThumbnailFile(null);
    setIsDemoModalOpen(true);
  }

  function openEditDemo(demo: DemoItem) {
    setEditingDemo({ ...demo });
    setThumbnailFile(null);
    setIsDemoModalOpen(true);
  }

  async function handleSaveDemo(e: React.FormEvent) {
    e.preventDefault();
    if (!editingDemo || !editingDemo.title || !editingDemo.category_id || !editingDemo.demo_url) return;

    setSavingDemo(true);
    try {
      let finalThumbnail = editingDemo.thumbnail_url;

      if (thumbnailFile) {
        const { url, error: uploadErr } = await uploadThumbnail(thumbnailFile);
        if (!uploadErr && url) {
          finalThumbnail = url;
        }
      }

      const slug =
        editingDemo.slug ||
        editingDemo.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      await saveDemo({
        ...editingDemo,
        title: editingDemo.title,
        slug,
        category_id: editingDemo.category_id,
        demo_url: editingDemo.demo_url,
        description: editingDemo.description || "",
        technology: editingDemo.technology || "Custom",
        thumbnail_url: finalThumbnail || "/hero-main.png",
        stack: editingDemo.stack || [],
        featured: Boolean(editingDemo.featured),
        published: editingDemo.published !== false,
        display_order: Number(editingDemo.display_order) || 0,
      });

      await refreshData();
      setIsDemoModalOpen(false);
    } catch (err) {
      console.error("[admin] failed to save demo:", err);
    } finally {
      setSavingDemo(false);
    }
  }

  async function handleDeleteDemo(id: string) {
    if (!confirm("Are you sure you want to permanently delete this demo?")) return;
    await deleteDemo(id);
    await refreshData();
  }

  // ── Category Actions ──
  function openAddCategory() {
    setEditingCategory({
      name: "",
      slug: "",
      description: "",
      parent_id: null,
      icon: "folder",
      display_order: categories.length + 1,
      published: true,
    });
    setIsCategoryModalOpen(true);
  }

  function openEditCategory(cat: DemoCategory) {
    setEditingCategory({ ...cat });
    setIsCategoryModalOpen(true);
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name) return;

    setSavingCategory(true);
    try {
      const slug =
        editingCategory.slug ||
        editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      await saveCategory({
        ...editingCategory,
        name: editingCategory.name,
        slug,
        description: editingCategory.description || null,
        parent_id: editingCategory.parent_id || null,
        icon: editingCategory.icon || null,
        display_order: Number(editingCategory.display_order) || 0,
        published: editingCategory.published !== false,
      });

      await refreshData();
      setIsCategoryModalOpen(false);
    } catch (err) {
      console.error("[admin] failed to save category:", err);
    } finally {
      setSavingCategory(false);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Deleting this category will also remove all its subcategories and associated demos. Continue?")) return;
    await deleteCategory(id);
    await refreshData();
  }

  const topCategories = categories.filter((c) => !c.parent_id);

  function getCategoryName(id: string) {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Unassigned";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-24">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline/60">
        <div>
          <div className="mono text-[10px] uppercase tracking-widest text-signal mb-1.5 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMIN DASHBOARD // DEMO LIBRARY
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Showcase Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/demos"
            className="mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg border border-hairline text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Showcase
          </Link>
          <button
            onClick={handleLogout}
            className="mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg border border-critical/40 text-critical hover:bg-critical/10 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Development Status Banner if not connected to live Supabase */}
      {!isConfigured && (
        <div className="my-6 p-4 rounded-xl bg-amber/10 border border-amber/30 text-amber flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold uppercase tracking-wider block mb-1">
              Local Development Mode
            </span>
            Supabase environment variables are currently empty. All data is running via the high-fidelity in-memory seed engine. To enable real database persistence, add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file, and run <code>supabase/schema.sql</code> in your Supabase SQL editor.
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="glass-card p-5 rounded-2xl border border-hairline/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Total Demos
          </div>
          <div className="font-display text-3xl font-bold text-signal">
            {demos.length}
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-hairline/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Categories
          </div>
          <div className="font-display text-3xl font-bold text-foreground">
            {categories.length}
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-hairline/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Featured Demos
          </div>
          <div className="font-display text-3xl font-bold text-amber">
            {demos.filter((d) => d.featured).length}
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-hairline/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Published
          </div>
          <div className="font-display text-3xl font-bold text-green-400">
            {demos.filter((d) => d.published).length}
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline/60 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("demos")}
            className={`mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${
              activeTab === "demos"
                ? "bg-signal text-signal-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Demos ({demos.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${
              activeTab === "categories"
                ? "bg-signal text-signal-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>

        {activeTab === "demos" ? (
          <button
            onClick={openAddDemo}
            className="mono text-xs uppercase tracking-wider px-4 py-2 bg-signal/15 border border-signal/40 text-signal hover:bg-signal/25 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Demo
          </button>
        ) : (
          <button
            onClick={openAddCategory}
            className="mono text-xs uppercase tracking-wider px-4 py-2 bg-signal/15 border border-signal/40 text-signal hover:bg-signal/25 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Category
          </button>
        )}
      </div>

      {/* ── Tab 1: Demos Management ── */}
      {activeTab === "demos" && (
        <div className="my-6">
          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden space-y-3">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className="p-4 rounded-xl border border-hairline/70 bg-panel/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-base text-foreground leading-snug">
                      {demo.title}
                    </div>
                    <div className="text-[11px] mono text-muted-foreground truncate max-w-[220px]">
                      {demo.demo_url}
                    </div>
                  </div>
                  {demo.featured && (
                    <span className="shrink-0 inline-flex items-center gap-1 mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber/20 text-amber font-semibold border border-amber/30">
                      <Star className="w-3 h-3 fill-amber text-amber" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="mono text-[10px] px-2 py-0.5 rounded border border-hairline bg-muted/40 text-muted-foreground">
                    {getCategoryName(demo.category_id)}
                  </span>
                  <span className="mono text-[10px] px-2 py-0.5 rounded border border-signal/30 text-signal bg-signal/10 font-semibold">
                    {demo.technology}
                  </span>
                  {demo.published ? (
                    <span className="text-green-400 flex items-center gap-1 text-[11px] font-semibold ml-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px] ml-auto">
                      <XCircle className="w-3.5 h-3.5" /> Draft
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-hairline/40 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditDemo(demo)}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-hairline bg-muted/20 text-foreground font-semibold mono text-xs uppercase tracking-wider active:bg-muted/40 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-signal" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDemo(demo.id)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg border border-critical/40 text-critical hover:bg-critical/10 active:bg-critical/20 transition-colors flex items-center justify-center"
                    title="Delete Demo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-xl border border-hairline/60 bg-panel/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 border-b border-hairline/60 mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3.5">Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Tech</th>
                    <th className="p-3.5">Featured</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Order</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline/40">
                  {demos.map((demo) => (
                    <tr key={demo.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3.5 font-medium text-foreground">
                        <div className="font-semibold text-sm">{demo.title}</div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-xs font-normal">
                          {demo.demo_url}
                        </div>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {getCategoryName(demo.category_id)}
                      </td>
                      <td className="p-3.5">
                        <span className="mono text-[9px] uppercase px-2 py-0.5 rounded border border-hairline bg-muted/30 text-foreground/80">
                          {demo.technology}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {demo.featured ? (
                          <Star className="w-4 h-4 fill-amber text-amber" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {demo.published ? (
                          <span className="text-green-400 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 mono">{demo.display_order}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditDemo(demo)}
                          className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-signal transition-colors"
                          title="Edit Demo"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDemo(demo.id)}
                          className="p-1.5 rounded hover:bg-critical/20 text-muted-foreground hover:text-critical transition-colors"
                          title="Delete Demo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Categories Management ── */}
      {activeTab === "categories" && (
        <div className="my-6">
          {/* Mobile Stacked Cards (< md) */}
          <div className="md:hidden space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border border-hairline/70 bg-panel/50 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-base text-foreground flex items-center gap-2">
                    <Folder className="w-4 h-4 text-signal shrink-0" />
                    {cat.name}
                  </div>
                  {cat.published ? (
                    <span className="text-green-400 flex items-center gap-1 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <XCircle className="w-3.5 h-3.5" /> Draft
                    </span>
                  )}
                </div>

                <div className="text-xs text-muted-foreground flex flex-col gap-1 mono">
                  <div>
                    <span className="text-muted-foreground/60">Slug:</span> {cat.slug}
                  </div>
                  <div>
                    <span className="text-muted-foreground/60">Type:</span>{" "}
                    {cat.parent_id ? (
                      <span className="text-signal font-normal">
                        Subcategory of {getCategoryName(cat.parent_id)}
                      </span>
                    ) : (
                      <span className="font-semibold text-foreground">Top-Level Folder</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-hairline/40 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditCategory(cat)}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-hairline bg-muted/20 text-foreground font-semibold mono text-xs uppercase tracking-wider active:bg-muted/40 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-signal" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg border border-critical/40 text-critical hover:bg-critical/10 active:bg-critical/20 transition-colors flex items-center justify-center"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-xl border border-hairline/60 bg-panel/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 border-b border-hairline/60 mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Slug</th>
                    <th className="p-3.5">Type / Parent</th>
                    <th className="p-3.5">Order</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline/40">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3.5 font-semibold text-foreground flex items-center gap-2">
                        <Folder className="w-4 h-4 text-signal shrink-0" />
                        {cat.name}
                      </td>
                      <td className="p-3.5 mono text-muted-foreground">{cat.slug}</td>
                      <td className="p-3.5 text-muted-foreground">
                        {cat.parent_id ? (
                          <span className="text-signal/90">
                            Subcategory of {getCategoryName(cat.parent_id)}
                          </span>
                        ) : (
                          <span className="font-semibold text-foreground">
                            Top-Level Folder
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 mono">{cat.display_order}</td>
                      <td className="p-3.5">
                        {cat.published ? (
                          <span className="text-green-400 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditCategory(cat)}
                          className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-signal transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 rounded hover:bg-critical/20 text-muted-foreground hover:text-critical transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Demo Modal (Create / Edit) ── */}
      {isDemoModalOpen && editingDemo && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsDemoModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-panel border border-hairline rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 sm:space-y-6 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-hairline/60">
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                {editingDemo.id ? "Edit Demo Website" : "Add New Demo Website"}
              </h2>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 text-muted-foreground hover:text-foreground active:bg-muted/40 rounded-lg transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDemo} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Demo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDemo.title || ""}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, title: e.target.value })
                    }
                    placeholder="e.g. Modern Restaurant"
                    className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={editingDemo.category_id || ""}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.parent_id ? `↳ ${c.name}` : c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Live Demo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingDemo.demo_url || ""}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, demo_url: e.target.value })
                    }
                    placeholder="https://demo.techvrs.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Technology Type *
                  </label>
                  <select
                    value={editingDemo.technology || "WordPress"}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, technology: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                  >
                    <option value="WordPress">WordPress</option>
                    <option value="Custom / Next.js">Custom / Next.js</option>
                    <option value="Custom / React">Custom / React</option>
                    <option value="Shopify">Shopify</option>
                    <option value="Webflow">Webflow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingDemo.description || ""}
                  onChange={(e) =>
                    setEditingDemo({ ...editingDemo, description: e.target.value })
                  }
                  placeholder="Overview of the concept, conversion features, and target industry…"
                  className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(editingDemo.stack || []).join(", ")}
                  onChange={(e) =>
                    setEditingDemo({
                      ...editingDemo,
                      stack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="WordPress, WooCommerce, Elementor, Tailwind"
                  className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                />
              </div>

              {/* Thumbnail upload */}
              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Preview Image / Thumbnail
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setThumbnailFile(e.target.files[0]);
                    }}
                    className="text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-signal file:text-signal-foreground"
                  />
                  <span className="text-muted-foreground text-[10px]">or URL:</span>
                  <input
                    type="text"
                    value={editingDemo.thumbnail_url || ""}
                    onChange={(e) =>
                      setEditingDemo({
                        ...editingDemo,
                        thumbnail_url: e.target.value,
                      })
                    }
                    placeholder="/hero-main.png"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-hairline bg-panel text-xs text-foreground outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-hairline/40">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDemo.featured || false}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, featured: e.target.checked })
                    }
                    className="rounded border-hairline"
                  />
                  <span className="text-xs">Featured Demo</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDemo.published !== false}
                    onChange={(e) =>
                      setEditingDemo({ ...editingDemo, published: e.target.checked })
                    }
                    className="rounded border-hairline"
                  />
                  <span className="text-xs">Published</span>
                </label>

                <div>
                  <label className="mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingDemo.display_order ?? 0}
                    onChange={(e) =>
                      setEditingDemo({
                        ...editingDemo,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-hairline bg-panel text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-hairline/60">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-hairline text-muted-foreground hover:text-foreground text-xs mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDemo}
                  className="px-5 py-2 rounded-lg bg-signal text-signal-foreground font-semibold text-xs mono uppercase hover:shadow-[0_0_20px_var(--signal)] transition-shadow disabled:opacity-50"
                >
                  {savingDemo ? "Saving…" : "Save Demo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Category Modal (Create / Edit) ── */}
      {isCategoryModalOpen && editingCategory && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-panel border border-hairline rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 sm:space-y-6 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-hairline/60">
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                {editingCategory.id ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 text-muted-foreground hover:text-foreground active:bg-muted/40 rounded-lg transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Food & Restaurant"
                  className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Parent Category (Leave empty for Top-Level Folder)
                </label>
                <select
                  value={editingCategory.parent_id || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      parent_id: e.target.value || null,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                >
                  <option value="">None (Top-Level Folder)</option>
                  {topCategories
                    .filter((t) => t.id !== editingCategory.id)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short description of this category…"
                  className="w-full px-3 py-2 rounded-lg border border-hairline bg-panel text-sm text-foreground outline-none focus:border-signal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-hairline/40">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.published !== false}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        published: e.target.checked,
                      })
                    }
                    className="rounded border-hairline"
                  />
                  <span className="text-xs">Published</span>
                </label>

                <div>
                  <label className="mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory.display_order ?? 0}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-hairline bg-panel text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-hairline/60">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-hairline text-muted-foreground hover:text-foreground text-xs mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCategory}
                  className="px-5 py-2 rounded-lg bg-signal text-signal-foreground font-semibold text-xs mono uppercase hover:shadow-[0_0_20px_var(--signal)] transition-shadow disabled:opacity-50"
                >
                  {savingCategory ? "Saving…" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

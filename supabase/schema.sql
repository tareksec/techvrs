-- ==============================================================================
-- TechVRS Demo Library / Website Showcase Schema
-- ==============================================================================
-- This script provisions the complete relational structure, performance indexes,
-- Row Level Security (RLS) policies, storage bucket, and development seed data.
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLES
-- Categories & Subcategories (Supports arbitrary nesting via parent_id)
CREATE TABLE IF NOT EXISTS public.demo_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES public.demo_categories(id) ON DELETE CASCADE,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Demos
CREATE TABLE IF NOT EXISTS public.demos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.demo_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT,
    demo_url TEXT NOT NULL,
    technology TEXT NOT NULL,
    stack TEXT[] NOT NULL DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_demo_categories_parent ON public.demo_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_demo_categories_published ON public.demo_categories(published, display_order);
CREATE INDEX IF NOT EXISTS idx_demos_category ON public.demos(category_id);
CREATE INDEX IF NOT EXISTS idx_demos_published ON public.demos(published, display_order);
CREATE INDEX IF NOT EXISTS idx_demos_featured ON public.demos(featured);
CREATE INDEX IF NOT EXISTS idx_demos_slug ON public.demos(slug);

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.demo_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies
DROP POLICY IF EXISTS "Public can view published categories" ON public.demo_categories;
DROP POLICY IF EXISTS "Authenticated admins have full category access" ON public.demo_categories;
DROP POLICY IF EXISTS "Public can view published demos" ON public.demos;
DROP POLICY IF EXISTS "Authenticated admins have full demo access" ON public.demos;

-- Policies for demo_categories
CREATE POLICY "Public can view published categories"
    ON public.demo_categories
    FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated admins have full category access"
    ON public.demo_categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policies for demos
CREATE POLICY "Public can view published demos"
    ON public.demos
    FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated admins have full demo access"
    ON public.demos
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. STORAGE BUCKET CONFIGURATION
-- Provision the public storage bucket for demo thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('demo-thumbnails', 'demo-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public can read demo thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can upload demo thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can update demo thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can delete demo thumbnails" ON storage.objects;

CREATE POLICY "Public can read demo thumbnails"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'demo-thumbnails');

CREATE POLICY "Authenticated admins can upload demo thumbnails"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'demo-thumbnails');

CREATE POLICY "Authenticated admins can update demo thumbnails"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'demo-thumbnails');

CREATE POLICY "Authenticated admins can delete demo thumbnails"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'demo-thumbnails');

-- 6. SEED DATA
-- Insert Top-Level Folders (WordPress Websites & Custom Websites)
INSERT INTO public.demo_categories (id, name, slug, description, parent_id, icon, display_order, published)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'WordPress Websites', 'wordpress-websites', 'High-conversion, scalable WordPress solutions built with modern performance standards.', NULL, 'wordpress', 1, true),
    ('22222222-2222-2222-2222-222222222222', 'Custom Websites', 'custom-websites', 'Bespoke React, Next.js, and TypeScript web applications engineered for speed and scale.', NULL, 'code', 2, true)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description, display_order = EXCLUDED.display_order;

-- Insert WordPress Subcategories
INSERT INTO public.demo_categories (id, name, slug, description, parent_id, icon, display_order, published)
VALUES
    ('a1111111-1111-1111-1111-111111111111', 'Food & Restaurant', 'food-restaurant', 'Fine dining, artisan cafes, and delivery restaurants.', '11111111-1111-1111-1111-111111111111', 'utensils', 1, true),
    ('a2222222-2222-2222-2222-222222222222', 'E-commerce', 'ecommerce-wp', 'WooCommerce storefronts with optimized checkout funnels.', '11111111-1111-1111-1111-111111111111', 'shopping-bag', 2, true),
    ('a3333333-3333-3333-3333-333333333333', 'Corporate & Business', 'corporate-wp', 'Professional corporate, legal, and financial consulting sites.', '11111111-1111-1111-1111-111111111111', 'briefcase', 3, true),
    ('a4444444-4444-4444-4444-444444444444', 'Real Estate', 'real-estate-wp', 'Property showcases with interactive search and listings.', '11111111-1111-1111-1111-111111111111', 'building', 4, true),
    ('a5555555-5555-5555-5555-555555555555', 'Agency & Creative', 'agency-creative-wp', 'Creative design agencies, branding studios, and dynamic portfolio showcases.', '11111111-1111-1111-1111-111111111111', 'sparkles', 5, true),
    ('a6666666-6666-6666-6666-666666666666', 'Medical & Healthcare', 'medical-healthcare-wp', 'Medical clinic, hospital, doctor appointment booking, and healthcare practices.', '11111111-1111-1111-1111-111111111111', 'activity', 6, true),
    ('a7777777-7777-7777-7777-777777777777', 'SaaS & Tech Solutions', 'saas-tech-wp', 'Enterprise software, AI startups, cyber security, and managed IT services.', '11111111-1111-1111-1111-111111111111', 'cpu', 7, true)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description, parent_id = EXCLUDED.parent_id;

-- Insert Custom Websites Subcategories
INSERT INTO public.demo_categories (id, name, slug, description, parent_id, icon, display_order, published)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'SaaS & Web Apps', 'saas-custom', 'Modern software-as-a-service platforms and interactive tools.', '22222222-2222-2222-2222-222222222222', 'cpu', 1, true),
    ('b2222222-2222-2222-2222-222222222222', 'Agency & Portfolio', 'agency-custom', 'Design studios, architecture showcases, and high-impact portfolios.', '22222222-2222-2222-2222-222222222222', 'sparkles', 2, true),
    ('b3333333-3333-3333-3333-333333333333', 'Headless E-commerce', 'ecommerce-custom', 'Lightning-fast React/Next.js storefronts with Shopify or Medusa.', '22222222-2222-2222-2222-222222222222', 'zap', 3, true),
    ('b4444444-4444-4444-4444-444444444444', 'Landing Pages', 'landing-pages-custom', 'High-conversion, sub-second landing pages built for campaign ROI.', '22222222-2222-2222-2222-222222222222', 'layers', 4, true)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description, parent_id = EXCLUDED.parent_id;

-- Insert Demos
INSERT INTO public.demos (category_id, title, slug, description, thumbnail_url, demo_url, technology, stack, featured, published, display_order)
VALUES
    -- WordPress / Food & Restaurant
    ('a1111111-1111-1111-1111-111111111111', 'L''Aura Gastronomy', 'laura-gastronomy', 'Michelin-star restaurant concept featuring table reservations, seasonal culinary menus, and smooth visual storytelling.', '/hero-main.png', 'https://demo.techvrs.com/wp/laura', 'WordPress', ARRAY['WordPress', 'Elementor Pro', 'OpenTable API', 'ACF Pro'], true, true, 1),
    ('a1111111-1111-1111-1111-111111111111', 'Artisan Roast Cafe', 'artisan-roast-cafe', 'Specialty coffee bar template with bean subscription purchasing, location finder, and wholesale inquiry funnel.', '/hero-bg.png', 'https://demo.techvrs.com/wp/artisan-roast', 'WordPress', ARRAY['WordPress', 'WooCommerce', 'Tailwind', 'Stripe'], false, true, 2),
    ('a1111111-1111-1111-1111-111111111111', 'Urban Bistro & Bar', 'urban-bistro-bar', 'Modern urban bistro and cocktail lounge featuring live event schedules, online ordering, and VIP table bookings.', '/hero-main.png', 'https://demo.techvrs.com/wp/urban-bistro', 'WordPress', ARRAY['WordPress', 'Gutenberg Blocks', 'SevenRooms'], false, true, 3),

    -- WordPress / E-commerce
    ('a2222222-2222-2222-2222-222222222222', 'Veloce Luxury Apparel', 'veloce-luxury-apparel', 'Minimalist fashion e-commerce storefront with instant live search, variant pickers, and optimized one-page checkout.', '/hero-main.png', 'https://demo.techvrs.com/wp/veloce', 'WordPress', ARRAY['WordPress', 'WooCommerce', 'Redis Cache', 'Cloudflare'], true, true, 1),
    ('a2222222-2222-2222-2222-222222222222', 'Terra Organica Marketplace', 'terra-organica', 'Eco-friendly goods and skincare store featuring recurring subscriptions, bundle discounts, and loyalty points.', '/hero-bg.png', 'https://demo.techvrs.com/wp/terra', 'WordPress', ARRAY['WordPress', 'WooCommerce Subscriptions', 'WP Rocket'], false, true, 2),

    -- WordPress / Corporate
    ('a3333333-3333-3333-3333-333333333333', 'Vanguard Advisory Group', 'vanguard-advisory', 'Executive financial advisory platform with interactive ROI calculators, client portal login, and compliance disclosures.', '/hero-main.png', 'https://demo.techvrs.com/wp/vanguard', 'WordPress', ARRAY['WordPress', 'Custom Block Theme', 'Gravity Forms', 'HubSpot CRM'], false, true, 1),
    ('a3333333-3333-3333-3333-333333333333', 'Apex Legal Partners', 'apex-legal-partners', 'High-end law practice portal featuring attorney profiles, practice area deep-dives, and secure consultation booking.', '/hero-bg.png', 'https://demo.techvrs.com/wp/apex-legal', 'WordPress', ARRAY['WordPress', 'ACF Pro', 'Calendly Integration'], false, true, 2),

    -- WordPress / Real Estate
    ('a4444444-4444-4444-4444-444444444444', 'Sovereign Luxury Estates', 'sovereign-estates', 'Luxury architectural properties showcase with high-res galleries, virtual walkthrough embeds, and private agent inquiries.', '/hero-main.png', 'https://demo.techvrs.com/wp/sovereign', 'WordPress', ARRAY['WordPress', 'Custom Post Types', 'Mapbox GL', 'Matterport Embed'], true, true, 1),

    -- Custom / SaaS & Web Apps
    ('b1111111-1111-1111-1111-111111111111', 'PulseOps Cloud Observability', 'pulseops-saas', 'Developer-first infrastructure monitoring platform with interactive live telemetry graphs, team workspace switcher, and docs.', '/hero-main.png', 'https://demo.techvrs.com/custom/pulseops', 'Custom / Next.js', ARRAY['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Supabase'], true, true, 1),
    ('b1111111-1111-1111-1111-111111111111', 'CogniScale AI Platform', 'cogniscale-ai', 'Enterprise generative AI orchestration suite with workflow node builder, API playground, and token usage analytics.', '/hero-bg.png', 'https://demo.techvrs.com/custom/cogniscale', 'Custom / React', ARRAY['React 19', 'Vite', 'TanStack Router', 'OpenAI API', 'Tailwind'], true, true, 2),

    -- Custom / Agency & Portfolio
    ('b2222222-2222-2222-2222-222222222222', 'Monochrome Design Studio', 'monochrome-studio', 'Award-winning digital creative agency portfolio with magnetic cursor interactions, smooth case study transitions, and dark aesthetic.', '/hero-main.png', 'https://demo.techvrs.com/custom/monochrome', 'Custom / Next.js', ARRAY['Next.js', 'Framer Motion', 'Tailwind CSS', 'Lenis Scroll'], false, true, 1),
    ('b2222222-2222-2222-2222-222222222222', 'Atelier K Architects', 'atelier-k', 'Spatial architectural studio index with project filtering by typology, fullscreen photo viewer, and monograph index.', '/hero-bg.png', 'https://demo.techvrs.com/custom/atelier-k', 'Custom / React', ARRAY['React', 'TypeScript', 'Vite', 'CSS Grid'], false, true, 2),

    -- Custom / Headless E-commerce
    ('b3333333-3333-3333-3333-333333333333', 'Kroma Minimal Hardware', 'kroma-hardware', 'Ultra-fast headless hardware storefront with sub-200ms page transitions, instant cart mutations, and 3D product previews.', '/hero-main.png', 'https://demo.techvrs.com/custom/kroma', 'Custom / Next.js', ARRAY['Next.js', 'Medusa.js', 'Tailwind', 'Stripe Elements'], true, true, 1),

    -- Custom / Landing Pages
    ('b4444444-4444-4444-4444-444444444444', 'FlowState Productivity App', 'flowstate-landing', 'Conversion-optimized SaaS launch page with interactive feature demo tabs, social proof marquee, and annual pricing calculator.', '/hero-main.png', 'https://demo.techvrs.com/custom/flowstate', 'Custom / React', ARRAY['React', 'Vite', 'Tailwind CSS', 'Lucide'], false, true, 1),

    -- ─── 18 Newly Categorized Demos ──────────────────────────────────────────
    -- WordPress / SaaS & Tech Solutions
    ('a7777777-7777-7777-7777-777777777777', 'SaaSoft – Software & SaaS WordPress Theme', 'saasoft-saas-wordpress-theme', 'Modern software, app launch, and SaaS startup WordPress theme with interactive pricing tiers and feature demonstration sections.', '/1.webp', 'http://saasoft.wpenginepowered.com/', 'WordPress', ARRAY['WordPress', 'Elementor Pro', 'SaaS Startup', 'WP Engine'], true, true, 10),
    ('a7777777-7777-7777-7777-777777777777', 'AIFusionX – AI Agency & Tech WordPress Theme', 'aifusionx-ai-tech-agency-wp', 'Next-generation artificial intelligence agency, machine learning SaaS, and futuristic tech startup WordPress theme by VamTam.', '/4.webp', 'https://themes.vamtam.com/?theme=aifusionx&n=1&storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'VamTam', 'AI Solutions'], true, true, 11),
    ('a7777777-7777-7777-7777-777777777777', 'Zypho – Cyber Security & IT Solutions Elementor Template Kit', 'zypho-cyber-security-it-solutions', 'Enterprise cyber security consulting, infrastructure defense, and managed IT services Elementor template kit.', '/1.webp', 'https://templatekit.kitprostudio.com/zypho/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'Cyber Security', 'IT Solutions'], false, true, 12),

    -- WordPress / Agency & Creative
    ('a5555555-5555-5555-5555-555555555555', 'Marpixel – Marketing Agency WordPress Theme', 'marpixel-marketing-agency-wp', 'High-conversion digital marketing agency, growth consultancy, and creative advertising studio WordPress theme.', '/2.webp', 'https://themexriver.com/wp/marpixel/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'Marketing Agency', 'Growth'], true, true, 13),
    ('a5555555-5555-5555-5555-555555555555', 'Isak – Personal Portfolio WordPress Theme', 'isak-personal-portfolio-wp', 'Creative personal portfolio and resume WordPress theme featuring interactive canvas backgrounds and sleek light/dark aesthetics.', '/2.webp', 'https://isak.autodealwordpress.com/home-background/?mode=light', 'WordPress', ARRAY['WordPress', 'Elementor', 'Interactive Canvas', 'Portfolio'], false, true, 14),
    ('a5555555-5555-5555-5555-555555555555', 'Clariver – Creative Digital Agency Elementor Template Kit', 'clariver-creative-agency-kit', 'Creative digital agency, branding studio, and typography-rich design showcase Elementor template kit.', '/1.webp', 'https://clariver.tokotema.xyz/template-kit/home/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'Digital Agency', 'Creative Studio'], false, true, 15),

    -- WordPress / Corporate & Business
    ('a3333333-3333-3333-3333-333333333333', 'Bixoo – Business Consulting & Corporate WordPress Theme', 'bixoo-business-consulting-corporate', 'Enterprise business consulting, corporate advisory, and financial strategy WordPress theme with case study showcases.', '/3.webp', 'https://bixoowp.wowtheme7.com/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'Consulting', 'Corporate'], false, true, 16),
    ('a3333333-3333-3333-3333-333333333333', 'Bizznep – Business Consulting & Corporate WordPress Theme', 'bizznep-business-consulting-onepage', 'Sleek single-page corporate consulting and business advisory layout with smooth navigation and lead generation.', '/4.webp', 'https://demo.bravisthemes.com/bizznep/home-1-onepage-2/', 'WordPress', ARRAY['WordPress', 'Elementor', 'OnePage', 'Bravisthemes'], false, true, 17),
    ('a3333333-3333-3333-3333-333333333333', 'Brevon – Multipurpose Business & Agency WordPress Theme', 'brevon-multipurpose-business-agency', 'Multipurpose business, agency, and creative portfolio WordPress theme with custom Elementor widgets.', '/1.webp', 'https://brevondemo.ex-coders.com/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'WooCommerce', 'Elementor', 'Ex-Coders'], false, true, 18),

    -- WordPress / Medical & Healthcare
    ('a6666666-6666-6666-6666-666666666666', 'MD – Medical, Doctor & Healthcare WordPress Theme', 'md-medical-doctor-healthcare', 'Modern clinic, hospital, doctor appointment booking, and healthcare facility WordPress theme with medical department schedules.', '/2.webp', 'https://md.axiomthemes.com/?storefront=envato-elements', 'WordPress', ARRAY['WordPress', 'Elementor', 'Healthcare', 'AxiomThemes'], true, true, 19),

    -- Custom / SaaS & Web Apps
    ('b1111111-1111-1111-1111-111111111111', 'SVG Mask Effect | Aceternity UI', 'svg-mask-effect-aceternity-ui', 'A mask reveal effect, hover the cursor over a container to reveal what''s underneath with SVG clipping paths and smooth physics.', '/3.webp', 'https://ui.aceternity.com/components/svg-mask-effect', 'Custom / React', ARRAY['React', 'Next.js', 'Framer Motion', 'Tailwind CSS'], true, true, 20),
    ('b1111111-1111-1111-1111-111111111111', 'Paynext - Modern Fintech Website HTML Template', 'paynext-modern-fintech-website', 'Feature-rich HTML template for fintech startups, digital banking, payment gateways, and crypto asset management.', '/3.webp', 'https://paynext-html.peterdraw.co/?storefront=envato-elements', 'Custom / HTML5', ARRAY['HTML5', 'Tailwind CSS', 'Fintech', 'Banking'], true, true, 21),

    -- Custom / Agency & Portfolio
    ('b2222222-2222-2222-2222-222222222222', 'Designpro - Productized Design Agency website template', 'designpro-productized-agency-nextjs', 'Productized design subscription agency platform built with Next.js, featuring monthly recurring pricing plans and work galleries.', '/4.webp', 'https://designpro-next.vercel.app/?storefront=envato-elements', 'Custom / Next.js', ARRAY['Next.js 14', 'React', 'Tailwind CSS', 'Vercel'], true, true, 22),
    ('b2222222-2222-2222-2222-222222222222', 'Danbury – Architecture & Interior Design HTML5 Template', 'danbury-architecture-interior-design', 'Minimalist architectural studio, spatial construction, and contemporary interior design showcase template.', '/3.webp', 'https://html.tonatheme.com/2020/Danbury/?storefront=envato-elements', 'Custom / HTML5', ARRAY['HTML5', 'Bootstrap', 'Architecture', 'Interior Design'], false, true, 23),
    ('b2222222-2222-2222-2222-222222222222', 'Modelissimo - Model Agency / Fashion Muse Template', 'modelissimo-model-agency-fashion', 'High-fashion modeling agency, talent management, model composite cards, and fashion photography portfolio.', '/4.webp', 'https://design4dj.com/tf/modelissimo/?storefront=envato-elements', 'Custom / HTML5', ARRAY['HTML5', 'CSS3', 'Fashion', 'Talent Agency'], false, true, 24),
    ('b2222222-2222-2222-2222-222222222222', 'Sepia - Photography Portfolio HTML Website Template', 'sepia-photography-portfolio-website', 'Comprehensive photography portfolio and creative visual artist showcase template with responsive grid and masonry albums.', '/2.webp', 'https://demo.themetorium.net/html/sepia/?storefront=envato-elements', 'Custom / HTML5', ARRAY['HTML5', 'PhotoSwipe', 'Grid Gallery', 'Masonry'], false, true, 25),

    -- Custom / Landing Pages
    ('b4444444-4444-4444-4444-444444444444', 'Charifund | Nonprofit & Fundraising Charity NEXT JS Template', 'charifund-nonprofit-fundraising-nextjs', 'Nonprofit fundraising charity and donation campaigns web application engineered with modern Next.js and responsive layouts.', '/1.webp', 'https://nextjs.charifund.wowtheme7.com/?storefront=envato-elements', 'Custom / Next.js', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Donations'], false, true, 26),
    ('b4444444-4444-4444-4444-444444444444', 'Pubzi - eSports and Gaming HTML Template', 'pubzi-esports-gaming-html-template', 'High-octane eSports tournament portal, clan battle stats, twitch stream embeds, and gaming community HTML template.', '/3.webp', 'https://ex-coders.com/html/pubzi/index.html', 'Custom / HTML5', ARRAY['HTML5', 'CSS3', 'JavaScript', 'eSports'], false, true, 27)
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title, description = EXCLUDED.description, demo_url = EXCLUDED.demo_url, technology = EXCLUDED.technology, stack = EXCLUDED.stack;

export type ServiceSlug =
  | "web-development"
  | "web-design"
  | "secure-seo"
  | "seo"
  | "ai-security";

export interface ServiceWorkflowStep {
  phase: string;
  detail: string;
}

export interface Service {
  slug: ServiceSlug;
  index: string;
  tagline: string;
  title: string;
  description: string;
  bullets: string[];
  caseCategory: "Web" | "Design" | "SEO" | "AI Solutions";
  intro: string;
  workflow: ServiceWorkflowStep[];
  tools: string[];
  outcome: string;
}

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    tagline: "Modern. Scalable. High-Performance.",
    title: "Web Development",
    description:
      "Modern, scalable, fast, and business-focused websites and web applications built with clean architecture and production-grade security.",
    bullets: [
      "Business & corporate websites",
      "Custom web applications & modern React/Next.js",
      "CMS & headless API integrations",
      "Performance optimization & maintenance",
    ],
    caseCategory: "Web",
    intro:
      "We build scalable, high-performance web applications and business sites engineered for speed, clean code, and long-term reliability. From robust frontend architectures to secure API integrations, our systems are built to support measurable business growth without compromising stability.",
    workflow: [
      {
        phase: "Discovery & Architecture",
        detail:
          "Requirements mapping, component architecture, data flow, and tech stack alignment to your business goals.",
      },
      {
        phase: "Frontend Engineering",
        detail:
          "Modern React and TypeScript development, responsive mobile-first layouts, and accessible UI component systems.",
      },
      {
        phase: "API & Backend Integration",
        detail:
          "Headless CMS, secure REST/GraphQL endpoints, authentication, and third-party SaaS integrations.",
      },
      {
        phase: "Optimization & Launch",
        detail:
          "Core Web Vitals tuning, automated deployment pipelines, SSL enforcement, and production handover.",
      },
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "REST / GraphQL", "Vite"],
    outcome:
      "Ultra-fast, maintainable web applications with 95+ Lighthouse scores, sub-second page loads, and clean maintainable codebases.",
  },
  {
    slug: "web-design",
    index: "02",
    tagline: "Conversion-Focused Digital Experiences.",
    title: "Web Design",
    description:
      "Modern UI/UX and conversion-focused digital experiences designed to engage visitors, reflect your brand authority, and turn clicks into customers.",
    bullets: [
      "UI/UX & digital product design",
      "Conversion-focused landing pages",
      "Corporate website & brand redesigns",
      "Design systems & responsive layouts",
    ],
    caseCategory: "Design",
    intro:
      "Great design isn't just aesthetic — it's functional, persuasive, and aligned with user intent. We design high-converting landing pages, SaaS interfaces, and corporate web platforms that elevate your brand and guide users toward action with intuitive, polished interactions.",
    workflow: [
      {
        phase: "User Research & Wireframing",
        detail:
          "Information architecture, customer journey mapping, structural wireframes, and conversion path planning.",
      },
      {
        phase: "UI & Design System",
        detail:
          "High-fidelity prototypes, brand design tokens, typography scales, and reusable component libraries.",
      },
      {
        phase: "Interactive Prototyping",
        detail:
          "Micro-interactions, mobile-first responsive validation, user flow testing, and design QA.",
      },
      {
        phase: "Development Handoff",
        detail:
          "Pixel-perfect design specs, production asset export, design tokens, and engineering alignment.",
      },
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "Design Tokens", "Wireframing", "Micro-Interactions"],
    outcome:
      "Compelling, conversion-optimized interfaces that increase engagement, reduce bounce rates, and establish immediate brand authority.",
  },
  {
    slug: "secure-seo",
    index: "03",
    tagline: "Technical Visibility Without Exposure.",
    title: "Secure SEO",
    description:
      "A major TechVRS differentiator — combining technical SEO audits, Core Web Vitals optimization, and site architecture with security awareness.",
    bullets: [
      "Technical SEO & security audits",
      "Core Web Vitals & mobile performance",
      "Indexation control & crawl optimization",
      "Structured data, canonicals & security headers",
    ],
    caseCategory: "SEO",
    intro:
      "We audit and optimize your site through a technical and security lens. To search engines and malicious crawlers, misconfigurations look the same: exposed staging environments, slow render paths, redirect chains, and insecure headers hurt both your organic rank and your security posture. We fix both together.",
    workflow: [
      {
        phase: "Technical Crawl & Surface Audit",
        detail:
          "Identify crawl errors, indexation leaks, duplicate paths, staging exposure, and latency bottlenecks.",
      },
      {
        phase: "Core Web Vitals & Render Path",
        detail:
          "Eliminate render-blocking resources, optimize LCP/INP/CLS, and streamline asset delivery.",
      },
      {
        phase: "Architecture & Indexation Lockdown",
        detail:
          "Canonical enforcement, XML sitemaps, robots directives, schema validation, and staging isolation.",
      },
      {
        phase: "Continuous Telemetry",
        detail:
          "Google Search Console monitoring, crawl telemetry, and automated regression defense.",
      },
    ],
    tools: ["Search Console", "Screaming Frog", "Lighthouse", "Schema.org", "Cloudflare", "Security Headers"],
    outcome:
      "Green Core Web Vitals across all templates, zero indexation leaks, and search engine crawl efficiency that powers sustained organic ranking gains.",
  },
  {
    slug: "seo",
    index: "04",
    tagline: "Sustainable Organic Growth & Authority.",
    title: "On-Page & Off-Page SEO",
    description:
      "Comprehensive organic growth strategy covering keyword intent, structured content architecture, digital PR, and high-authority backlink development.",
    bullets: [
      "Keyword research & search intent mapping",
      "On-page metadata, content structure & schema",
      "Internal linking strategy & topic clusters",
      "Authority building, digital PR & backlink analysis",
    ],
    caseCategory: "SEO",
    intro:
      "Search visibility requires both relevance on the page and trust across the web. We build comprehensive SEO growth campaigns that optimize every heading, paragraph, and internal link for user intent, paired with ethical authority building to earn sustainable, qualified search traffic without risky shortcuts.",
    workflow: [
      {
        phase: "Keyword & Intent Analysis",
        detail:
          "Search intent mapping, commercial keyword prioritization, and competitor content gap analysis.",
      },
      {
        phase: "On-Page Optimization",
        detail:
          "Heading hierarchy, rich schema, keyword integration, content depth, and internal linking networks.",
      },
      {
        phase: "Authority & Digital PR",
        detail:
          "Relevant industry backlink acquisition, brand mention monitoring, and ethical outreach.",
      },
      {
        phase: "Growth Tracking & Iteration",
        detail:
          "Keyword rank tracking, organic traffic attribution, conversion analysis, and continuous refinement.",
      },
    ],
    tools: ["Ahrefs", "Semrush", "Google Search Console", "Google Analytics 4", "SurferSEO", "Schema Validator"],
    outcome:
      "Consistent expansion in organic keyword footprints, stronger domain authority, and qualified inbound lead generation from high-intent searches.",
  },
  {
    slug: "ai-security",
    index: "05",
    tagline: "Secure AI Systems for Modern Business.",
    title: "AI Security & AI Solutions",
    description:
      "Secure AI implementation for modern businesses — custom AI workflows, intelligent automation, and LLM integrations engineered with privacy, guardrails, and compliance.",
    bullets: [
      "AI automation & intelligent business workflows",
      "Custom AI agents & LLM integrations",
      "AI security assessment & prompt hardening",
      "Data privacy-first architecture & audit trails",
    ],
    caseCategory: "AI Solutions",
    intro:
      "We don't just integrate AI — we build AI systems with security, reliability, and business requirements in mind. Whether you need autonomous customer workflows, internal knowledge assistants, or automated data pipelines, our solutions feature scoped permissions, zero data leakage, and rigorous guardrails.",
    workflow: [
      {
        phase: "Workflow Discovery & Feasibility",
        detail:
          "Identify manual bottlenecks, define data boundaries, map ROI, and establish compliance boundaries.",
      },
      {
        phase: "Guardrails & Architecture",
        detail:
          "Prompt injection defense, field-level redaction, scoped credentials, and OWASP LLM security standards.",
      },
      {
        phase: "System Development & Integration",
        detail:
          "Python/FastAPI services, LLM connectors, vector stores, and seamless API orchestration.",
      },
      {
        phase: "Auditing, Evals & Monitoring",
        detail:
          "Automated evals, performance monitoring, full audit logging, and human-in-the-loop controls.",
      },
    ],
    tools: ["Python", "FastAPI", "OpenAI API", "Docker", "Redis", "OAuth 2.0", "OpenTelemetry", "OWASP LLM Top 10"],
    outcome:
      "Reliable business automation that saves hundreds of team hours monthly with complete audit trails, zero PII exposure, and resilient guardrails.",
  },
];

export interface CaseStudy {
  slug: string;
  index: string;
  category: "Web" | "Design" | "SEO" | "AI Solutions";
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "saas-web-platform",
    index: "WEB-01",
    category: "Web",
    title: "Modern SaaS Platform: High-Performance React Web Application",
    challenge:
      "A B2B software company needed a fast, scalable web application with modern UX, seamless API integrations, and enterprise-grade performance.",
    approach:
      "Engineered a modular React/TypeScript architecture, optimized bundle delivery, and integrated secure authentication and headless CMS.",
    outcome:
      "Achieved 98 mobile performance score, sub-800ms initial load time, and a scalable foundation for 10x traffic growth.",
    metrics: [
      { label: "Performance Score", value: "98" },
      { label: "Initial Load Time", value: "0.8s" },
      { label: "Bounce Reduction", value: "32%" },
    ],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    slug: "client-hardening-tls-ddos",
    index: "SEC-01",
    category: "Web",
    title: "Enterprise Site Hardening: Zero-Downtime TLS & Edge Mitigation",
    challenge:
      "High-traffic client site facing performance bottlenecks, weak SSL configuration, and DDoS exposure ahead of a national product launch.",
    approach:
      "Rebuilt deployment pipeline, enforced TLS 1.3 with strict HSTS, implemented edge caching and rate-limiting on Cloudflare.",
    outcome:
      "Zero downtime throughout launch week, 92% reduction in flagged configuration vulnerabilities, and A+ security rating.",
    metrics: [
      { label: "Launch Downtime", value: "0m" },
      { label: "Vulns Closed", value: "92%" },
      { label: "Security Grade", value: "A+" },
    ],
    stack: ["Cloudflare", "Nginx", "Terraform", "Let's Encrypt", "Docker"],
  },
  {
    slug: "fintech-conversion-redesign",
    index: "DES-01",
    category: "Design",
    title: "Fintech Web Experience: Conversion-Focused UI/UX Redesign",
    challenge:
      "A financial technology service suffered from high drop-offs and poor user engagement on core landing pages due to dated, complex layouts.",
    approach:
      "Redesigned the complete visual system, created a cohesive design system, simplified user journeys, and introduced conversion-focused interactive micro-interactions.",
    outcome:
      "Significantly elevated brand perception, +44% increase in demo requests, and cohesive design system deployed across 20+ templates.",
    metrics: [
      { label: "Demo Inquiries", value: "+44%" },
      { label: "Session Duration", value: "+58%" },
      { label: "Design System", value: "20+ components" },
    ],
    stack: ["Figma", "Design Systems", "UI/UX", "Tailwind CSS", "React"],
  },
  {
    slug: "ecom-technical-seo-audit",
    index: "SEO-01",
    category: "SEO",
    title: "E-Commerce SEO & Performance: Technical Architecture Overhaul",
    challenge:
      "Multi-category e-commerce store struggling with crawl budget waste, indexation leaks on faceted filters, and failing Core Web Vitals.",
    approach:
      "Restructured canonical logic and robots directives, eliminated redirect chains, refactored render paths and image delivery for instant page loads.",
    outcome:
      "Organic traffic +38% within 90 days, all Core Web Vitals in the green, and completely resolved crawl bloat.",
    metrics: [
      { label: "Organic Growth", value: "+38%" },
      { label: "LCP", value: "1.4s" },
      { label: "Indexation Leaks", value: "0" },
    ],
    stack: ["Next.js", "Lighthouse", "Screaming Frog", "Search Console", "Schema.org"],
  },
  {
    slug: "b2b-organic-seo-growth",
    index: "SEO-02",
    category: "SEO",
    title: "B2B Organic Search Growth: Topic Architecture & Authority",
    challenge:
      "B2B service provider lacked organic search visibility for high-intent commercial keywords against entrenched legacy competitors.",
    approach:
      "Built topic cluster architecture, optimized on-page search intent and structured schema, coupled with targeted digital PR and authority backlink acquisition.",
    outcome:
      "Ranked in top 3 for 28 high-value commercial keywords, generating a 2.4x increase in inbound organic qualified leads.",
    metrics: [
      { label: "Top 3 Keywords", value: "28" },
      { label: "Inbound Leads", value: "2.4x" },
      { label: "Domain Authority", value: "+16" },
    ],
    stack: ["Ahrefs", "Semrush", "Search Console", "Google Analytics 4", "Schema Markup"],
  },
  {
    slug: "secure-agent-crm-workflow",
    index: "AI-01",
    category: "AI Solutions",
    title: "Enterprise AI Workflow: Secure CRM Automation with Scoped Access",
    challenge:
      "Operations team wanted to automate customer data triage and CRM summary generation without risking customer PII or compliance violations.",
    approach:
      "Engineered a scoped AI agent with token exchange, field-level data redaction, prompt-injection defenses, and complete audit logging.",
    outcome:
      "Automated 70% of routine CRM ticket processing with zero PII incidents over 6 months in production and complete audit trails.",
    metrics: [
      { label: "PII Incidents", value: "0" },
      { label: "Workflow Speed", value: "3x" },
      { label: "Audit Tracing", value: "100%" },
    ],
    stack: ["Python", "FastAPI", "OAuth 2.0", "Postgres", "OpenTelemetry", "OWASP LLM Top 10"],
  },
];

export const skills = {
  "Web & Frontend": [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "REST & GraphQL",
    "State Architecture",
    "Vite",
  ],
  "UI/UX & Design": [
    "Figma",
    "Design Systems",
    "Responsive UI",
    "Conversion Layouts",
    "Wireframing",
    "Micro-Interactions",
    "Design Tokens",
  ],
  "SEO & Visibility": [
    "Technical SEO",
    "Core Web Vitals",
    "Structured Data",
    "Crawl Budget Tuning",
    "Search Console",
    "Ahrefs / Semrush",
    "Indexation Control",
  ],
  "Secure AI & Cloud": [
    "Python / FastAPI",
    "LLM Integration",
    "Prompt Hardening",
    "Cloudflare / Edge",
    "Docker",
    "OAuth 2.0",
    "OpenTelemetry",
    "OWASP Standards",
  ],
};

export const certs = [
  "React & TypeScript Engineering",
  "Technical SEO Specialist",
  "Cloudflare Edge & Security",
  "Secure AI Architect",
];

/* ── Tool role descriptions — powers the interactive Stack Matrix &
      service toolchain tooltips ─────────────────────────────────── */
export const toolRoles: Record<string, string> = {
  // Web & Frontend
  "React / Next.js": "Primary framework for modern, SEO-friendly, scalable client web applications.",
  TypeScript: "Type safety across frontend and backend integrations, eliminating runtime bugs.",
  "Tailwind CSS": "Utility-first design implementation with consistent design system tokens.",
  "Node.js": "Backend service layer, SSR rendering, and API orchestrations.",
  "REST & GraphQL": "Secure and typed client-server communication channels.",
  "State Architecture": "Predictable client-side data management for responsive user experiences.",
  Vite: "High-speed build tool and development server for modern web projects.",
  React: "Modern UI component architecture.",
  "Next.js": "Production React framework for server-side rendering and static optimization.",

  // UI/UX & Design
  Figma: "Collaborative interface design, wireframing, and component specification.",
  "Design Systems": "Unified component libraries, typography, and color tokens across all pages.",
  "Responsive UI": "Fluid, mobile-first design ensuring flawless rendering on all screen sizes.",
  "Conversion Layouts": "Strategic visual hierarchy and UX patterns engineered to maximize conversion rates.",
  Wireframing: "Structural blueprinting of pages before design and code implementation.",
  "Micro-Interactions": "Subtle UI animations that enhance user delight and guide attention.",
  "Design Tokens": "Standardized design variables for seamless code synchronization.",

  // SEO & Visibility
  "Technical SEO": "Full-site auditing to eliminate crawl issues, staging leaks, and status errors.",
  "Core Web Vitals": "Speed optimization (LCP, INP, CLS) tested against real mobile device benchmarks.",
  "Structured Data": "Schema.org markup implementation enabling rich Google search snippets.",
  "Crawl Budget Tuning": "Robots.txt, sitemaps, and canonical optimization for search engine crawlers.",
  "Search Console": "Search telemetry, indexation status tracking, and query performance analysis.",
  "Ahrefs / Semrush": "In-depth competitor analysis, backlink monitoring, and keyword gap research.",
  "Indexation Control": "Preventing duplicate content and securing staging URLs from being indexed.",
  "Screaming Frog": "Comprehensive technical website crawler for audit diagnosis.",
  Lighthouse: "Automated auditing for performance, accessibility, SEO, and best practices.",
  "Schema.org": "Structured data standard powering enhanced search engine results.",
  "Security Headers": "HTTP response headers protecting users and building domain trust.",

  // Secure AI & Cloud
  "Python / FastAPI": "Lightweight, high-performance backends for custom AI workflows and microservices.",
  Python: "Backend language powering automation, AI agents, and data processing.",
  FastAPI: "High-performance async Python framework for AI agent APIs.",
  "LLM Integration": "Scoped connections to leading AI models with strict token and data controls.",
  "OpenAI API": "Enterprise LLM backbone with authenticated API endpoints and scoped tokens.",
  "Prompt Hardening": "Defenses against prompt injection, data extraction, and hallucination risks.",
  "Cloudflare / Edge": "WAF, DDoS mitigation, global CDN, and edge routing protecting origin servers.",
  Cloudflare: "Global edge network providing DDoS protection, WAF, and speed optimization.",
  Docker: "Containerized application deployments ensuring environmental consistency and security.",
  "OAuth 2.0": "Scoped, user-level token authorization preventing unauthorized access.",
  OpenTelemetry: "End-to-end tracing and audit logs across all automated actions and services.",
  "OWASP Standards": "Security benchmark checklists applied across web apps and LLM deployments.",
  "OWASP LLM Top 10": "Design checklist for securing AI applications against leaks and exploits.",
  Redis: "In-memory caching and queuing layer for fast AI response pipelines.",
  Nginx: "Hardened reverse proxy with custom TLS configuration and rate limiting.",
  Terraform: "Infrastructure as code ensuring reproducible, auditable cloud environments.",
  "Let's Encrypt": "Automated SSL/TLS certificate management ensuring continuous encryption.",
};

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  metric: string;
  metricLabel: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "TechVRS rebuilt our corporate web platform and overhauled our technical SEO. Not only did our page load times drop below 1 second, but our organic search traffic grew by 38% in the first quarter. Their technical discipline is unmatched.",
    name: "Head of Marketing",
    role: "B2B SaaS Enterprise · Client Partner",
    metric: "38%",
    metricLabel: "Organic traffic growth",
  },
  {
    quote:
      "The custom AI workflow TechVRS deployed automated our customer inquiry routing while adhering strictly to our data security requirements. We saved over 20 hours weekly without any security or compliance compromises.",
    name: "VP of Operations",
    role: "E-Commerce Group · Client Partner",
    metric: "70%",
    metricLabel: "Triage automation",
  },
];

export const categories = [
  "Landing pages",
  "SaaS",
  "E-commerce",
  "Portfolios",
  "Dashboards",
  "Business",
  "Content",
  "Web apps",
] as const;
export type Category = (typeof categories)[number];
export type Prompt = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  brand: string;
  headline: string;
  accent: string;
  style: string;
  level: "Starter" | "Intermediate" | "Advanced";
  tags: string[];
  pages: string[];
  features: string[];
  direction: string;
  featured?: boolean;
};

export const prompts: Prompt[] = [
  {
    slug: "saas-launchpad",
    title: "SaaS launchpad",
    category: "SaaS",
    description:
      "A sharp product launch site that turns curious visitors into your next customers.",
    brand: "orbit",
    headline: "Less busywork.\nMore possibility.",
    accent: "sage",
    style: "Clean & minimal",
    level: "Intermediate",
    tags: ["Marketing", "Pricing", "Light mode"],
    pages: ["Home", "Features", "Pricing", "Contact"],
    features: [
      "Monthly/yearly pricing toggle with clearly stated billing totals",
      "Feature comparison and expandable FAQs",
      "Validated demo request form with explicit submission status",
    ],
    direction:
      "Use a pale sage canvas, oversized charcoal typography, thin borders, lime calls to action, and a layered product UI preview. Keep pricing and feature claims clearly marked as examples.",
    featured: true,
  },
  {
    slug: "creative-studio",
    title: "Independent creative studio",
    category: "Portfolios",
    description:
      "An expressive, editorial portfolio for studios with something different to say.",
    brand: "FORM®",
    headline: "Good things.\nBy design.",
    accent: "orange",
    style: "Bold & editorial",
    level: "Starter",
    tags: ["Agency", "Typography", "Case studies"],
    pages: ["Home", "Work", "Project detail", "About", "Contact"],
    features: [
      "Filterable project grid by discipline",
      "Case studies with challenge, process, and outcome",
      "Inquiry form with project type and budget range",
    ],
    direction:
      "Use a burnt-orange background, oversized serif headlines, black rules, playful numbering, and an asymmetrical editorial grid. Label all project outcomes as sample content.",
    featured: true,
  },
  {
    slug: "analytics-workspace",
    title: "Analytics workspace",
    category: "Dashboards",
    description:
      "Make complex metrics feel simple with a focused, data-rich dashboard.",
    brand: "metric",
    headline: "Your business,\nin perspective.",
    accent: "purple",
    style: "Dark & modern",
    level: "Advanced",
    tags: ["Charts", "Data tables", "Dark mode"],
    pages: ["Overview", "Reports", "Customers", "Settings"],
    features: [
      "Date-range filtering that updates all metrics from the same seeded dataset",
      "Accessible charts with text summaries and CSV export",
      "Sortable paginated customer table and persistent display preferences",
    ],
    direction:
      "Build a dark graphite workspace with violet accents, compact sidebar, restrained metric cards, and readable charts. Clearly label all metrics as demo data.",
    featured: true,
  },
  {
    slug: "everyday-store",
    title: "Everyday essentials store",
    category: "E-commerce",
    description:
      "A calm, thoughtful storefront for products worth making room for.",
    brand: "everyday.",
    headline: "Fewer things.\nBetter things.",
    accent: "sand",
    style: "Warm & organic",
    level: "Advanced",
    tags: ["Storefront", "Cart", "Product filters"],
    pages: ["Home", "Shop", "Product detail", "Cart", "Delivery & returns"],
    features: [
      "Product filters for price, category, and availability",
      "Variant selection with correct price and stock state",
      "Persistent cart with quantity updates and transparent subtotal; mark checkout as a demo until a payment provider is connected",
    ],
    direction:
      "Use warm ivory, olive green, generous whitespace, rounded product stages, and an editorial serif. Render abstract CSS product placeholders when actual product photos are unavailable.",
    featured: true,
  },
  {
    slug: "developer-portfolio",
    title: "Developer portfolio",
    category: "Portfolios",
    description:
      "Put your projects, process, and personality in one memorable place.",
    brand: "alex.dev",
    headline: "Thoughtful code.\nUseful things.",
    accent: "blue",
    style: "Clean & minimal",
    level: "Starter",
    tags: ["Personal", "Projects", "Resume"],
    pages: ["Home", "Projects", "Project detail", "About"],
    features: [
      "Filterable projects with stack and working source links",
      "Accessible light/dark theme switch",
      "Experience timeline and downloadable resume only when a real file exists",
    ],
    direction:
      "Use an off-white canvas, cobalt details, monospaced labels, and a confident typographic hierarchy. Avoid invented employment or client endorsements.",
  },
  {
    slug: "startup-waitlist",
    title: "The next big thing",
    category: "Landing pages",
    description:
      "Give an early idea a home with a focused pre-launch landing page.",
    brand: "nextup",
    headline: "A little ahead\nof what's next.",
    accent: "pink",
    style: "Bold & editorial",
    level: "Starter",
    tags: ["Waitlist", "Startup", "Launch"],
    pages: ["Landing", "Privacy"],
    features: [
      "Email validation with loading, success, duplicate, and failure states",
      "Feature teaser and expandable questions",
      "Never claim an email has been subscribed without a successful backend response",
    ],
    direction:
      "Use pale pink, deep burgundy type, an oversized circular motif, and one clear call to action. Do not invent subscriber counts.",
  },
  {
    slug: "neighborhood-cafe",
    title: "Neighborhood café",
    category: "Business",
    description:
      "A welcoming local website with a menu that is easy to find and love.",
    brand: "slow mornings",
    headline: "Stay a little.\nSip something good.",
    accent: "sand",
    style: "Warm & organic",
    level: "Starter",
    tags: ["Restaurant", "Menu", "Local business"],
    pages: ["Home", "Menu", "Our story", "Visit"],
    features: [
      "Menu filters with allergen labels and prices",
      "Editable opening hours with timezone",
      "Address, directions link, and click-to-call using explicitly supplied contact details",
    ],
    direction:
      "Pair cream and coffee brown with expressive serif type and a paper-like layout. Use sample labels for all business details.",
  },
  {
    slug: "project-command-center",
    title: "Project command center",
    category: "Web apps",
    description:
      "A practical Kanban workspace for keeping a small team moving.",
    brand: "ontrack",
    headline: "Big ideas.\nSmall next steps.",
    accent: "sage",
    style: "Clean & minimal",
    level: "Advanced",
    tags: ["Kanban", "Productivity", "CRUD"],
    pages: ["Projects", "Project board", "Task detail", "Settings"],
    features: [
      "Create, edit, archive, and restore tasks with validation",
      "Move tasks between columns using pointer or keyboard controls",
      "Search and filter by status and assignee with local persistence and a clearly labeled single-browser demo mode",
    ],
    direction:
      "Use soft green accents, neutral panels, clear priority badges, and calm compact typography. Do not present local state as shared multi-user storage.",
  },
  {
    slug: "editorial-journal",
    title: "The editorial journal",
    category: "Content",
    description:
      "Let great stories lead with a beautifully readable independent publication.",
    brand: "margin",
    headline: "Ideas worth\nsitting with.",
    accent: "orange",
    style: "Bold & editorial",
    level: "Intermediate",
    tags: ["Blog", "Magazine", "Reading"],
    pages: ["Home", "Topics", "Article", "About"],
    features: [
      "Full-text article search and topic filtering",
      "Readable article layouts with generated table of contents",
      "Related articles and browser-local reading bookmarks",
    ],
    direction:
      "Use newspaper-like black rules, warm white, orange accents, oversized serif titles, and a strong column grid.",
  },
  {
    slug: "finance-overview",
    title: "Personal finance overview",
    category: "Dashboards",
    description:
      "Help people understand spending with clear categories and useful comparisons.",
    brand: "penny",
    headline: "A clearer view\nof your everyday.",
    accent: "blue",
    style: "Clean & minimal",
    level: "Advanced",
    tags: ["Finance", "Budgets", "Charts"],
    pages: ["Overview", "Transactions", "Budgets", "Settings"],
    features: [
      "Filter seeded transactions by category and month",
      "Editable monthly budgets and calculated progress",
      "CSV export and currency formatting; clearly state no bank connection or financial advice",
    ],
    direction:
      "Use cobalt accents, spacious white cards, legible tabular numbers, and accessible charts with non-color status indicators.",
  },
  {
    slug: "consultant-website",
    title: "Independent consultant",
    category: "Business",
    description:
      "Explain your expertise, services, and next steps with confidence.",
    brand: "clearpath",
    headline: "Clarity first.\nProgress follows.",
    accent: "sage",
    style: "Clean & minimal",
    level: "Starter",
    tags: ["Services", "Consulting", "Lead generation"],
    pages: ["Home", "Services", "About", "Contact"],
    features: [
      "Service comparison with scope and deliverables",
      "Accessible inquiry form with validation",
      "Scheduling link only if a real URL is provided; otherwise show contact details",
    ],
    direction:
      "Use deep forest green, soft cream, strong typography, and structured service cards. Never fabricate qualifications, logos, or client testimonials.",
  },
  {
    slug: "digital-product-shop",
    title: "Digital product shop",
    category: "E-commerce",
    description:
      "Give templates, kits, and downloads a storefront of their own.",
    brand: "supply",
    headline: "Your next project\nstarts here.",
    accent: "purple",
    style: "Dark & modern",
    level: "Advanced",
    tags: ["Digital products", "Catalog", "Downloads"],
    pages: ["Home", "Catalog", "Product detail", "License", "Cart"],
    features: [
      "Search and filter by product type and license",
      "Product details with file formats and requirements",
      "Demo cart; protect paid downloads server-side when real payments are connected",
    ],
    direction:
      "Use dark navy, lavender highlights, crisp grids, and code-native product cover graphics. Mark placeholder prices and products as examples.",
  },
  {
    slug: "event-landing",
    title: "A gathering of good minds",
    category: "Landing pages",
    description:
      "Build excitement around a conference with an agenda that gets to the point.",
    brand: "assembly / 27",
    headline: "Meet the people.\nMake the future.",
    accent: "orange",
    style: "Bold & editorial",
    level: "Intermediate",
    tags: ["Events", "Agenda", "Tickets"],
    pages: ["Home", "Schedule", "Speakers", "Venue"],
    features: [
      "Agenda filtering by track and day",
      "Speaker profiles with clearly labeled sample identities",
      "Timezone-aware schedule and ticket-provider link when supplied",
    ],
    direction:
      "Use punchy orange, large black typography, numbered sessions, and a rhythmic editorial grid. Respect reduced-motion preferences.",
  },
  {
    slug: "course-library",
    title: "Learning library",
    category: "Content",
    description:
      "An approachable course catalog that helps learners find their next skill.",
    brand: "curious",
    headline: "Follow your\ncuriosity.",
    accent: "pink",
    style: "Warm & organic",
    level: "Intermediate",
    tags: ["Education", "Courses", "Progress"],
    pages: ["Courses", "Course detail", "Lesson", "My learning"],
    features: [
      "Course search by topic and difficulty",
      "Lesson navigation with browser-local completion tracking",
      "Accessible video embed with transcript placeholder and clear sample-content labels",
    ],
    direction:
      "Use pale blush, raspberry accents, rounded cards, and clear reading-focused typography.",
  },
  {
    slug: "booking-workspace",
    title: "Appointment booking",
    category: "Web apps",
    description:
      "A considered booking flow for independent service businesses.",
    brand: "booked",
    headline: "Make time\nfor what matters.",
    accent: "blue",
    style: "Clean & minimal",
    level: "Advanced",
    tags: ["Booking", "Calendar", "Forms"],
    pages: ["Services", "Choose a time", "Your details", "Booking review"],
    features: [
      "Service selection with duration and transparent price",
      "Date and time selection with timezone and disabled past slots",
      "Editable booking review; a real confirmation requires server validation and duplicate-booking protection",
    ],
    direction:
      "Use blue and warm white with a linear stepper, large touch targets, and clear form feedback. Demo bookings must never imply a real reservation.",
  },
  {
    slug: "saas-documentation",
    title: "Product documentation",
    category: "SaaS",
    description:
      "Help new users reach their first success with searchable, structured docs.",
    brand: "stack / docs",
    headline: "From hello\nto shipped.",
    accent: "sand",
    style: "Clean & minimal",
    level: "Intermediate",
    tags: ["Documentation", "Search", "Developer tools"],
    pages: ["Introduction", "Quick start", "Guides", "API reference"],
    features: [
      "Client-side search across bundled documentation",
      "Keyboard-accessible sidebar and section anchors",
      "Code snippets with working copy buttons and clearly marked example credentials",
    ],
    direction:
      "Use a neutral three-column layout, olive active states, readable code blocks, and a right-hand table of contents on wide screens.",
  },
];

export const collections = [
  {
    slug: "launch-your-idea",
    title: "From idea to launch",
    description: "Give your next venture a confident first impression.",
    accent: "sage",
    slugs: [
      "saas-launchpad",
      "startup-waitlist",
      "consultant-website",
      "event-landing",
    ],
  },
  {
    slug: "creative-presence",
    title: "Made to stand out",
    description: "Distinctive digital homes for people who make things.",
    accent: "orange",
    slugs: [
      "creative-studio",
      "developer-portfolio",
      "editorial-journal",
      "digital-product-shop",
    ],
  },
  {
    slug: "build-a-business",
    title: "Open for business",
    description: "Bring products, services, and customers together.",
    accent: "sand",
    slugs: [
      "everyday-store",
      "neighborhood-cafe",
      "booking-workspace",
      "digital-product-shop",
    ],
  },
  {
    slug: "useful-every-day",
    title: "Useful, every day",
    description: "Go beyond a landing page with interactive workspaces.",
    accent: "purple",
    slugs: [
      "analytics-workspace",
      "project-command-center",
      "finance-overview",
      "course-library",
      "saas-documentation",
    ],
  },
];

export function makePrompt(
  prompt: Prompt,
  values: {
    name?: string;
    audience?: string;
    stack?: string;
    extra?: string;
  } = {},
) {
  return `Build a complete, responsive ${prompt.category.toLowerCase()} website for ${values.name?.trim() || "[PROJECT NAME]"}.

PROJECT BRIEF
${prompt.description}
Audience: ${values.audience?.trim() || "[TARGET AUDIENCE — describe their needs and primary goal]"}.
Technology: ${values.stack || "Use the existing project stack. For a new project, use React, TypeScript, and Tailwind CSS."}
Start by inspecting the existing project and reuse its routing, components, and conventions. State any assumptions. Ask only for missing decisions that block implementation.

PAGES & NAVIGATION
${prompt.pages.map((page, i) => `${i + 1}. ${page}`).join("\n")}
Give each page a real route, descriptive title, appropriate metadata, active navigation, and a useful not-found state.

VISUAL DIRECTION
${prompt.direction}
Treat the preview as visual direction, not a screenshot to reproduce. Create consistent spacing, typography, color tokens, and reusable components. Adapt the layout from 360px mobile to large desktop without horizontal overflow.

REQUIRED FUNCTIONALITY
${prompt.features.map((feature) => `- ${feature}`).join("\n")}
- Every visible control must work. Include loading, empty, validation, error, and success states where applicable.
- Use realistic seed content, clearly distinguish demo data, and avoid fabricated metrics or endorsements.

QUALITY & ACCESSIBILITY
- Use semantic landmarks, one clear page heading, associated form labels, visible focus, keyboard navigation, descriptive link text, and sufficient color contrast.
- Respect prefers-reduced-motion. Provide text alternatives for meaningful visuals.
- Validate inputs at trust boundaries. Keep secrets server-side. Never render untrusted HTML.
- Use an actual backend for shared data, authentication, or transactions when needed. If credentials are missing, document the setup and make the limitation visible instead of faking success.
- Optimize assets, reserve media dimensions, and keep dependencies and client bundles small.
- Handle unavailable browser storage and clipboard access gracefully.

ACCEPTANCE CHECKS
Run the production build and relevant lint/type checks. Verify all page routes, mobile and desktop layouts, keyboard flows, filtering, forms, and persistence. Test invalid inputs and empty/error states. Report what was verified and any remaining integration requirements.

DELIVERABLE
Implement working code, not just a proposal. Include a concise README with setup, environment variable names (no secrets), demo-data behavior, and deployment steps.${values.extra?.trim() ? `\n\nADDITIONAL REQUIREMENTS\n${values.extra.trim()}` : ""}`;
}

export type LibraryFilters = {
  q?: string;
  category?: string;
  level?: string;
  sort?: string;
  collection?: string;
};
export function filterPrompts(
  filters: LibraryFilters,
  items: Prompt[] = prompts,
) {
  const words = (filters.q || "")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const collection = collections.find(
    (item) => item.slug === filters.collection,
  );
  const result = items.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.level || p.level === filters.level) &&
      (!collection || collection.slugs.includes(p.slug)) &&
      words.every((word) =>
        `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`
          .toLowerCase()
          .includes(word),
      ),
  );
  return filters.sort === "az"
    ? result.sort((a, b) => a.title.localeCompare(b.title))
    : filters.sort === "starter"
      ? result.sort(
          (a, b) =>
            ["Starter", "Intermediate", "Advanced"].indexOf(a.level) -
            ["Starter", "Intermediate", "Advanced"].indexOf(b.level),
        )
      : result.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

export function validateFilters(
  search: Record<string, unknown>,
): LibraryFilters {
  return {
    q: typeof search.q === "string" ? search.q.slice(0, 200) : undefined,
    category: categories.includes(search.category as Category)
      ? String(search.category)
      : undefined,
    level: ["Starter", "Intermediate", "Advanced"].includes(
      String(search.level),
    )
      ? String(search.level)
      : undefined,
    sort: ["az", "starter"].includes(String(search.sort))
      ? String(search.sort)
      : undefined,
    collection: collections.some((c) => c.slug === search.collection)
      ? String(search.collection)
      : undefined,
  };
}

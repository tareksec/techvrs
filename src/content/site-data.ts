export type ServiceSlug =
  | "soc-cybersecurity"
  | "secure-web-deployment"
  | "technical-secure-seo"
  | "ai-agent-development";

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
  caseCategory: "SOC" | "Web" | "SEO" | "AI Agents";
  intro: string;
  workflow: ServiceWorkflowStep[];
  tools: string[];
  outcome: string;
}

export const services: Service[] = [
  {
    slug: "soc-cybersecurity",
    index: "01",
    tagline: "Detect. Investigate. Respond.",
    title: "SOC & Cybersecurity",
    description:
      "Continuous threat monitoring, log analysis, and incident response built on the same frameworks used in production SOC environments.",
    bullets: [
      "Threat monitoring & alert triage",
      "Log analysis & correlation",
      "Incident response & documentation",
      "Vulnerability assessment & remediation",
    ],
    caseCategory: "SOC",
    intro:
      "Most environments don't lack logs — they lack signal. This engagement builds (or overhauls) your detection capability: instrumenting the right sources, writing detection logic mapped to real adversary behaviour, and putting a documented response process behind every alert so an incident becomes a procedure instead of a panic.",
    workflow: [
      {
        phase: "Scope & Baseline",
        detail:
          "Inventory every log source and asset, map current detection coverage against MITRE ATT&CK, and agree a severity and escalation matrix before anything is deployed.",
      },
      {
        phase: "Instrument",
        detail:
          "Deploy and tune the SIEM (Splunk or Wazuh), roll out Sysmon and forwarders, and wire in threat-intel enrichment so events arrive with context, not just noise.",
      },
      {
        phase: "Detect & Triage",
        detail:
          "Author Sigma-based detection rules mapped to ATT&CK techniques, tune out false positives against your real traffic, and document a triage runbook for every alert class.",
      },
      {
        phase: "Respond & Report",
        detail:
          "Contain and eradicate confirmed incidents, write the post-incident report, and deliver monthly coverage reports so you can watch detection measurably improve.",
      },
    ],
    tools: ["Splunk", "Wazuh", "Sysmon", "Sigma", "MITRE ATT&CK", "TheHive", "MISP"],
    outcome:
      "A monitored environment with measurable coverage — in my lab and client work this standard has produced 60+ detection rules across 42 MITRE ATT&CK techniques and cut mean time-to-contain from 4 hours to 22 minutes.",
  },
  {
    slug: "secure-web-deployment",
    index: "02",
    tagline: "Architected to resist, not just run.",
    title: "Secure Web Deployment",
    description:
      "Infrastructure designed with the assumption that it will be tested. Hardened configurations, enforced encryption, and mitigation layers built in from day one.",
    bullets: [
      "Secure architecture & deploy pipelines",
      "Server hardening (OS, ports, access)",
      "SSL/TLS implementation & enforcement",
      "DDoS mitigation & traffic filtering",
    ],
    caseCategory: "Web",
    intro:
      "A deployment is a security decision, whether you make it deliberately or not. I build and harden the full path from DNS to origin under the assumption that the site will be scanned within hours of going live — because it will be.",
    workflow: [
      {
        phase: "Threat-Model the Stack",
        detail:
          "Enumerate the real exposure: open ports, DNS records, TLS posture, third-party scripts, and CI/CD secrets. Nothing gets hardened until it's mapped.",
      },
      {
        phase: "Harden the Base",
        detail:
          "Apply CIS-benchmark hardening to the OS and web server, enforce key-only SSH and least-privilege access, and lock down every service that doesn't need to be public.",
      },
      {
        phase: "Encrypt & Shield",
        detail:
          "Enforce TLS 1.3 with HSTS, deploy WAF rules and rate limiting at the edge, and put DDoS mitigation in front of the origin before launch — not after the first attack.",
      },
      {
        phase: "Verify & Hand Over",
        detail:
          "Re-scan with independent tooling, close what's found, and codify the entire hardened state in Terraform so it's reproducible — with documentation your team can actually operate.",
      },
    ],
    tools: ["Nginx", "Cloudflare", "Terraform", "Let's Encrypt", "Fail2ban", "Lynis", "OWASP ZAP"],
    outcome:
      "Infrastructure that survives contact: the last client launch shipped with an A+ TLS grade, 92% of flagged vulnerabilities closed on re-scan, and zero minutes of downtime through launch week.",
  },
  {
    slug: "technical-secure-seo",
    index: "03",
    tagline: "Visibility without exposure.",
    title: "Technical & Secure SEO",
    description:
      "Audits performed the way an attack surface is audited — identifying what's slow, misconfigured, or needlessly exposed to crawlers and bad actors.",
    bullets: [
      "Full technical SEO audits",
      "Secure indexing & crawl configuration",
      "Core Web Vitals & performance",
      "Structured data & sitemap integrity",
    ],
    caseCategory: "SEO",
    intro:
      "I audit a website the way I audit an attack surface — because to a crawler and an attacker, they're the same thing. Technical SEO done this way fixes rankings and closes exposure at the same time: staging leaks, misconfigured directives, slow render paths, and duplicate content are all the same class of problem.",
    workflow: [
      {
        phase: "Crawl & Expose",
        detail:
          "Run a full technical crawl to see exactly what search engines see: indexation leaks, redirect chains, orphaned pages, duplicate content, and anything exposed that shouldn't be.",
      },
      {
        phase: "Fix the Foundations",
        detail:
          "Rebuild the robots and sitemap strategy, enforce canonical URLs, implement structured data, and close every indexation leak — staging domains included.",
      },
      {
        phase: "Accelerate",
        detail:
          "Refactor the render path, image pipeline, and caching strategy until every Core Web Vital is in the green on real mobile devices, not just lab runs.",
      },
      {
        phase: "Monitor & Defend",
        detail:
          "Wire Search Console and Lighthouse checks into an ongoing report so gains hold, regressions get caught early, and nothing quietly re-leaks.",
      },
    ],
    tools: ["Screaming Frog", "Lighthouse", "Search Console", "Schema.org", "Cloudflare", "Next.js"],
    outcome:
      "Rankings built on infrastructure that's fast and closed: the last audit delivered +38% organic traffic in 90 days, a 1.4s LCP, and zero remaining indexation leaks.",
  },
  {
    slug: "ai-agent-development",
    index: "04",
    tagline: "Automation that doesn't leak.",
    title: "Secure Custom AI Agents",
    description:
      "Custom AI agents for real workflow automation, with the same data-privacy discipline applied to APIs, credentials, and outputs as any production system.",
    bullets: [
      "Custom agent design for your workflow",
      "Secure API integration & credentials",
      "Data privacy-first architecture",
      "Deployment, monitoring & iteration",
    ],
    caseCategory: "AI Agents",
    intro:
      "Most AI automation fails one of two ways: it doesn't actually save time, or it quietly becomes a data-leak vector. I build custom agents scoped to one real workflow, engineered against the OWASP LLM Top 10 from the first commit — so the automation compounds and the risk doesn't.",
    workflow: [
      {
        phase: "Map the Workflow",
        detail:
          "Sit with the actual process — the tickets, logs, or CRM entries eating your team's hours — and define exactly what data the agent may touch and what permissions it needs. Nothing more.",
      },
      {
        phase: "Design the Guardrails",
        detail:
          "Scoped tokens, field-level redaction, prompt-injection defenses, and output validation — designed before the first line of agent logic is written.",
      },
      {
        phase: "Build & Integrate",
        detail:
          "Python and FastAPI service with vault-backed secrets, containerized deployment, and API integrations that authenticate as the user — never as a god-mode service account.",
      },
      {
        phase: "Observe & Iterate",
        detail:
          "Full audit logging and OpenTelemetry tracing on every action, plus measured accuracy reviews so the agent improves on evidence, not vibes.",
      },
    ],
    tools: ["Python", "FastAPI", "OpenAI API", "Docker", "Redis", "OAuth 2.0", "OpenTelemetry"],
    outcome:
      "Automation with receipts: a triage agent that cut manual alert review by 68%, and a CRM assistant that ran six months in production with zero PII incidents and a complete audit trail.",
  },
];

export interface CaseStudy {
  slug: string;
  index: string;
  category: "SOC" | "Web" | "SEO" | "AI Agents";
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "soc-home-lab-siem",
    index: "SOC-01",
    category: "SOC",
    title: "SOC Home Lab: SIEM Deployment & Threat Detection",
    challenge:
      "Build a functioning detection environment from scratch to practice real alert triage.",
    approach:
      "Deployed a self-hosted SIEM, generated and analyzed simulated attack traffic, mapped detections to MITRE ATT&CK.",
    outcome:
      "Fully operational lab producing documented incident write-ups used as portfolio evidence for SOC readiness.",
    metrics: [
      { label: "MITRE techniques mapped", value: "42" },
      { label: "Detection rules authored", value: "60+" },
      { label: "Incident reports", value: "18" },
    ],
    stack: ["Splunk", "Sysmon", "Wazuh", "MITRE ATT&CK", "Sigma"],
  },
  {
    slug: "client-hardening-tls-ddos",
    index: "WEB-01",
    category: "Web",
    title: "Client Site Hardening: Zero-Downtime TLS & DDoS Mitigation",
    challenge:
      "A client's site had weak TLS configuration and no DDoS protection ahead of a launch.",
    approach:
      "Rebuilt the deployment pipeline, enforced TLS 1.3, implemented rate-limiting and mitigation at the edge.",
    outcome:
      "Zero downtime through launch, 92% reduction in flagged vulnerabilities on re-scan.",
    metrics: [
      { label: "Downtime through launch", value: "0m" },
      { label: "Vulnerabilities closed", value: "92%" },
      { label: "TLS grade", value: "A+" },
    ],
    stack: ["Nginx", "Cloudflare", "Let's Encrypt", "Fail2ban", "Terraform"],
  },
  {
    slug: "log-triage-ai-agent",
    index: "AI-01",
    category: "AI Agents",
    title: "Log Triage AI Agent",
    challenge:
      "Manual review of routine log alerts was consuming hours of analyst time.",
    approach:
      "Designed a custom agent to pre-triage low-severity alerts against known-safe patterns with strict API scoping and no data retention.",
    outcome:
      "68% reduction in manual triage volume, freeing analyst time for genuine anomalies.",
    metrics: [
      { label: "Triage volume reduced", value: "68%" },
      { label: "Mean triage time", value: "1.2s" },
      { label: "Fewer false positives", value: "41%" },
    ],
    stack: ["Python", "OpenAI API", "Redis", "Docker", "OWASP LLM Top 10"],
  },
  {
    slug: "ecom-technical-seo-audit",
    index: "SEO-01",
    category: "SEO",
    title: "E-Commerce Technical SEO & Security Audit",
    challenge:
      "Store leaking staging URLs to crawlers and failing Core Web Vitals on mobile.",
    approach:
      "Rebuilt robots + sitemap strategy, closed indexation leaks, refactored render path and image pipeline.",
    outcome:
      "Organic traffic +38% in 90 days, all CWV metrics in the green.",
    metrics: [
      { label: "Organic traffic", value: "+38%" },
      { label: "LCP", value: "1.4s" },
      { label: "Indexation leaks", value: "0" },
    ],
    stack: ["Next.js", "Lighthouse", "Screaming Frog", "Search Console"],
  },
  {
    slug: "phishing-response-playbook",
    index: "SOC-02",
    category: "SOC",
    title: "Phishing Response Playbook & Automation",
    challenge:
      "Inconsistent handling of user-reported phishing across a small IT team.",
    approach:
      "Authored an IR playbook, automated header/URL enrichment, and integrated with the mail gateway for one-click quarantine.",
    outcome:
      "Mean time-to-contain dropped from 4h to 22m across a 30-day window.",
    metrics: [
      { label: "MTTC", value: "22m" },
      { label: "Reports processed", value: "310" },
      { label: "Escalations avoided", value: "47" },
    ],
    stack: ["TheHive", "MISP", "urlscan.io", "Microsoft 365"],
  },
  {
    slug: "secure-agent-crm-workflow",
    index: "AI-02",
    category: "AI Agents",
    title: "Secure CRM Assistant with Scoped Access",
    challenge:
      "Sales team wanted an AI assistant on top of their CRM without exposing PII.",
    approach:
      "Built a scoped agent with per-user token exchange, field-level redaction, and full audit logging.",
    outcome:
      "Zero PII incidents in 6 months, 3x faster note capture per rep.",
    metrics: [
      { label: "PII incidents", value: "0" },
      { label: "Note capture speed", value: "3x" },
      { label: "Fields redacted", value: "24" },
    ],
    stack: ["Python", "FastAPI", "OAuth 2.0", "Postgres", "OpenTelemetry"],
  },
];

export const skills = {
  "SOC & Detection": [
    "Splunk",
    "ELK / Wazuh",
    "IDS/IPS",
    "MITRE ATT&CK",
    "Sigma rules",
    "Log correlation",
    "Incident triage",
  ],
  "Secure Infrastructure": [
    "Linux hardening",
    "TLS 1.3",
    "DNS security",
    "AWS / Azure",
    "Nginx",
    "Cloudflare",
    "Terraform",
  ],
  "Automation & AI": [
    "Python",
    "REST / GraphQL",
    "LLM workflows",
    "OWASP LLM Top 10",
    "Secrets vaulting",
    "OpenTelemetry",
  ],
  Frameworks: ["NIST CSF", "MITRE ATT&CK", "OWASP Top 10", "CIS Benchmarks"],
};

export const certs = [
  "CompTIA Security+",
  "CompTIA CySA+",
  "TryHackMe — Top 1%",
  "AWS Cloud Practitioner",
];

/* ── Tool role descriptions — powers the interactive Stack Matrix &
      service toolchain tooltips ─────────────────────────────────── */
export const toolRoles: Record<string, string> = {
  // SOC & Detection
  Splunk: "Primary SIEM — log ingestion, correlation searches, and dashboards used for alert triage.",
  "ELK / Wazuh": "Open-source detection stack for HIDS, log analysis, and cost-sensitive deployments.",
  Wazuh: "Open-source SIEM/HIDS used in detection labs and client deployments.",
  Sysmon: "Deep Windows endpoint telemetry — the raw material for high-fidelity detections.",
  Sigma: "Portable detection logic — written once, converted to any SIEM's query language.",
  "Sigma rules": "Portable detection logic — written once, converted to any SIEM's query language.",
  "IDS/IPS": "Network detection layer — signatures tuned against live traffic, not left at defaults.",
  "MITRE ATT&CK": "Coverage map — every detection rule is tagged to a specific adversary technique.",
  "Log correlation": "Joining endpoint, network, and auth events into a single incident timeline.",
  "Incident triage": "Structured severity assessment with documented runbooks and escalation paths.",
  TheHive: "Case management — every incident tracked, assigned, and auditable.",
  MISP: "Threat-intel platform feeding IOCs into detection and enrichment.",
  // Secure Infrastructure
  "Linux hardening": "CIS-benchmark server baselines — services, permissions, kernel parameters.",
  "TLS 1.3": "Modern encryption enforced with HSTS and a strict cipher policy on every deploy.",
  "DNS security": "DNSSEC, CAA records, and subdomain-takeover prevention.",
  "AWS / Azure": "Cloud infrastructure built with least-privilege IAM and audited configurations.",
  Nginx: "Hardened reverse proxy — security headers, rate limits, TLS termination.",
  Cloudflare: "Edge shield — WAF, DDoS mitigation, and caching in front of every origin.",
  Terraform: "Infrastructure as code — the hardened state is reproducible, not tribal knowledge.",
  "Let's Encrypt": "Automated certificate issuance and renewal — encryption that never lapses.",
  Fail2ban: "Host-level brute-force lockout on every exposed service.",
  Lynis: "Host audit scanner used to verify hardening before handover.",
  "OWASP ZAP": "Web application scanning to verify the deployment resists common attacks.",
  // SEO
  "Screaming Frog": "Full-site crawler — surfaces exactly what search engines (and attackers) see.",
  Lighthouse: "Core Web Vitals measurement, run continuously to prevent regressions.",
  "Search Console": "Indexation monitoring and query-level visibility after every fix ships.",
  "Schema.org": "Structured data implementation so results earn rich snippets.",
  "Next.js": "Framework of choice for fast, crawlable, secure client builds.",
  // Automation & AI
  Python: "Primary language for automation, security tooling, and agent backends.",
  FastAPI: "Lightweight Python API layer for agent services.",
  "OpenAI API": "LLM backbone — always called with scoped keys and validated outputs.",
  Docker: "Containerized deploys — reproducible, isolated, and disposable.",
  Redis: "Fast state and queue layer for agent pipelines.",
  "OAuth 2.0": "Per-user token exchange so agents act with the user's permissions — never more.",
  "REST / GraphQL": "API integration with scoped credentials and strict input validation.",
  "LLM workflows": "Agent pipelines with guardrails, evals, and human-in-the-loop checkpoints.",
  "OWASP LLM Top 10": "The design checklist for every AI build — prompt injection through data leakage.",
  "Secrets vaulting": "No credentials in code — vault-backed injection at runtime.",
  OpenTelemetry: "Tracing and audit visibility across every automated action.",
  // Frameworks
  "NIST CSF": "The framework I use to assess and communicate security posture.",
  "OWASP Top 10": "Baseline for every web application security review.",
  "CIS Benchmarks": "Hardening standards applied to servers and cloud accounts.",
};

/* ── Client testimonials — anonymized engagements; quotes are pending
      client publication approval and are labelled as such on-page ── */
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
      "We expected the usual pre-launch security scramble. Instead, the re-scan came back with 92% of flagged vulnerabilities closed, an A+ TLS grade, and the site never went down once during launch week. Everything was documented well enough that our own team can maintain it.",
    name: "Operations Director — anonymized",
    role: "E-commerce hardened-launch engagement · quote pending client publication approval",
    metric: "92%",
    metricLabel: "Vulns closed on re-scan",
  },
  {
    quote:
      "The triage agent cut our alert review workload by more than two-thirds without ever touching data it shouldn't. Six months in production, zero incidents, and a full audit trail on every action. It's rare to get automation speed and security discipline in the same build.",
    name: "IT Security Lead — anonymized",
    role: "SaaS secure AI agent engagement · quote pending client publication approval",
    metric: "68%",
    metricLabel: "Triage volume reduced",
  },
];

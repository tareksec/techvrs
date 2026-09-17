import test from "node:test";
import assert from "node:assert/strict";
import {
  categories,
  collections,
  filterPrompts,
  makePrompt,
  prompts,
  validateFilters,
} from "../src/content/pormts.ts";

test("catalog routes are unique and every collection resolves to real prompts", () => {
  assert.equal(new Set(prompts.map((p) => p.slug)).size, prompts.length);
  for (const category of categories)
    assert.ok(prompts.some((p) => p.category === category));
  for (const collection of collections) {
    assert.equal(new Set(collection.slugs).size, collection.slugs.length);
    for (const slug of collection.slugs)
      assert.ok(
        prompts.some((p) => p.slug === slug),
        slug,
      );
  }
});

test("search combines words, category, level, and collection without mutating the catalog", () => {
  const before = prompts.map((p) => p.slug);
  assert.deepEqual(
    filterPrompts({
      q: "  SAAS pricing ",
      category: "SaaS",
      level: "Intermediate",
      collection: "launch-your-idea",
    }).map((p) => p.slug),
    ["saas-launchpad"],
  );
  assert.equal(filterPrompts({ q: "zzzz-missing" }).length, 0);
  assert.equal(filterPrompts({ category: "SaaS", level: "Starter" }).length, 0);
  assert.equal(filterPrompts({ collection: "launch-your-idea" }).length, 4);
  filterPrompts({ sort: "az" });
  assert.deepEqual(
    prompts.map((p) => p.slug),
    before,
  );
  const sorted = filterPrompts({ sort: "starter" });
  assert.equal(sorted[0].level, "Starter");
  assert.equal(sorted.at(-1).level, "Advanced");
});

test("untrusted URL parameters are bounded and unknown filter values are ignored", () => {
  assert.deepEqual(
    validateFilters({
      category: ["SaaS"],
      level: "admin",
      q: {},
      sort: "invalid",
      collection: "nonexistent",
    }),
    {
      category: undefined,
      level: undefined,
      q: undefined,
      sort: undefined,
      collection: undefined,
    },
  );
  assert.equal(validateFilters({ q: "a".repeat(400) }).q.length, 200);
  assert.equal(
    validateFilters({
      category: "SaaS",
      level: "Starter",
      sort: "az",
      collection: "launch-your-idea",
    }).category,
    "SaaS",
  );
});

test("customization survives special characters and replaces project placeholders", () => {
  const text = makePrompt(prompts[0], {
    name: "  Studio $& <One>  ",
    audience: "Designers",
    stack: "HTML and CSS",
    extra: "Include বাংলা content.\nUse a contact page.",
  });
  assert.ok(text.includes("Studio $& <One>"));
  assert.ok(text.includes("Audience: Designers"));
  assert.ok(text.includes("Technology: HTML and CSS"));
  assert.ok(text.includes("Include বাংলা content.\nUse a contact page."));
  assert.ok(!text.includes("[PROJECT NAME]"));
  assert.ok(!text.includes("[TARGET AUDIENCE"));
});

test("every website brief includes its specific pages, functionality, and launch checks", () => {
  for (const prompt of prompts) {
    const text = makePrompt(prompt);
    for (const page of prompt.pages) assert.ok(text.includes(page));
    for (const feature of prompt.features) assert.ok(text.includes(feature));
    for (const section of [
      "PAGES & NAVIGATION",
      "VISUAL DIRECTION",
      "REQUIRED FUNCTIONALITY",
      "QUALITY & ACCESSIBILITY",
      "ACCEPTANCE CHECKS",
      "DELIVERABLE",
    ])
      assert.ok(text.includes(section));
    assert.ok(text.includes("Keep secrets server-side"));
    assert.ok(text.includes("[PROJECT NAME]"));
    assert.ok(!/midjourney|dall.e|--ar\s/.test(text.toLowerCase()));
  }
});

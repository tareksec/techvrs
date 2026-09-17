export function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function hubHead(
  title: string,
  path: string,
  description = "Thoughtfully crafted website-building prompts. Discover, customize, and save briefs for landing pages, online stores, dashboards, portfolios, and more.",
  privatePage = false,
) {
  return {
    meta: [
      { title: `${title} — pormts hub` },
      { name: "description", content: description },
      { name: "theme-color", content: "#52606e" },
      { property: "og:site_name", content: "pormts hub" },
      { property: "og:title", content: `${title} — pormts hub` },
      { property: "og:description", content: description },
      { property: "og:url", content: `https://techvrs.com${path}` },
      {
        property: "og:image",
        content: "https://techvrs.com/pormts-social.svg",
      },
      {
        property: "og:image:alt",
        content: "pormts hub — A better website starts with a better prompt.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: `${title} — pormts hub` },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: "https://techvrs.com/pormts-social.svg",
      },
      {
        name: "twitter:image:alt",
        content: "pormts hub — Website building prompt library",
      },
      ...(privatePage ? [{ name: "robots", content: "noindex,follow" }] : []),
    ],
    links: [{ rel: "canonical", href: `https://techvrs.com${path}` }],
  };
}

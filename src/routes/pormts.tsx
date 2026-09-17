import { createFileRoute } from "@tanstack/react-router";
import { HubLayout } from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";
import hubCss from "@/components/pormts/hub.css?url";

export const Route = createFileRoute("/pormts")({
  head: () => ({
    ...hubHead("Website building prompt library", "/pormts"),
    links: [
      ...hubHead("Website building prompt library", "/pormts").links,
      { rel: "stylesheet", href: hubCss },
    ],
  }),
  component: HubLayout,
});

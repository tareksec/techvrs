import { createFileRoute } from "@tanstack/react-router";
import { validateFilters } from "@/content/pormts";
import { Library } from "@/components/pormts/library";
export const Route = createFileRoute("/pormts/")({
  validateSearch: validateFilters,
  component: Library,
});

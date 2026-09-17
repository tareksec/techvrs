import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/prompts")({
  beforeLoad: () => {
    throw redirect({ to: "/pormts", statusCode: 301 });
  },
});

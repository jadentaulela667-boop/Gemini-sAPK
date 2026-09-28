import { createFileRoute } from "@tanstack/react-router";
import { MeridianApp } from "@/components/terminal/app-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <MeridianApp />;
}

// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

const SLUG = "branding-e-logotipos";

export const Route = createFileRoute("/services/branding-e-logotipos")({
  component: () => <ServiceDetail slug={SLUG} />,
  head: () => buildServiceHead(SLUG),
});
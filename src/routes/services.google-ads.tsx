// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

const SLUG = "google-ads";

export const Route = createFileRoute("/services/google-ads")({
  component: () => <ServiceDetail slug={SLUG} />,
  head: () => buildServiceHead(SLUG),
});
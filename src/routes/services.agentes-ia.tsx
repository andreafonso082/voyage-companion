// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

const SLUG = "agentes-ia";

export const Route = createFileRoute("/services/agentes-ia")({
  component: () => <ServiceDetail slug={SLUG} />,
  head: () => buildServiceHead(SLUG),
});
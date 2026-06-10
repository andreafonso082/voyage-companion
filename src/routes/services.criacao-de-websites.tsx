// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

const SLUG = "criacao-de-websites";

export const Route = createFileRoute("/services/criacao-de-websites")({
  component: () => <ServiceDetail slug={SLUG} />,
  head: () => buildServiceHead(SLUG),
});
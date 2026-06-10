// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

const SLUG = "seo-google-meu-negocio";

export const Route = createFileRoute("/services/seo-google-meu-negocio")({
  component: () => <ServiceDetail slug={SLUG} />,
  head: () => buildServiceHead(SLUG),
});
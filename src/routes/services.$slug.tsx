// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "../pages/ServiceDetail";
import { buildServiceHead } from "../lib/service-head";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  head: ({ params }) => buildServiceHead(params.slug),
});

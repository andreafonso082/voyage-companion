// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import CookiePolicy from "../pages/CookiePolicy";
import { buildHead } from "../lib/seo";

export const Route = createFileRoute("/cookies")({
  component: CookiePolicy,
  head: () =>
    buildHead({
      title: "Política de Cookies | Agência Vela",
      description:
        "Política de cookies da Agência Vela. Como utilizamos cookies no site da agência de marketing digital em Tavira, Algarve e Portugal.",
      path: "/cookies",
      noindex: true,
    }),
});

// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import Quote from "../pages/Quote";
import { breadcrumbList, buildHead, jsonLdScript } from "../lib/seo";

const TITLE = "Pedir Orçamento Gratuito | Marketing Digital e Web Design Algarve | Agência Vela";
const DESCRIPTION =
  "Peça orçamento gratuito à Agência Vela em Tavira e Algarve. Websites desde 700€, SEO, redes sociais e branding. Resposta em 24h, sem compromisso.";

export const Route = createFileRoute("/quote")({
  component: Quote,
  head: () => ({
    ...buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/quote",
      keywords:
        "orçamento marketing digital algarve, orçamento web design tavira, pedir orçamento agência vela, orçamento site profissional, orçamento SEO algarve",
    }),
    scripts: [
      jsonLdScript(breadcrumbList([{ name: "Início", path: "/" }, { name: "Orçamento", path: "/quote" }])),
    ],
  }),
});

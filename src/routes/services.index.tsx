// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import Services from "../pages/Services";
import { abs, breadcrumbList, buildHead, jsonLdScript } from "../lib/seo";
import { servicesData } from "../data/servicesData";

const TITLE = "Serviços de Marketing Digital e Web Design no Algarve e Tavira | Agência Vela";
const DESCRIPTION =
  "Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais, branding e agentes IA. Agência de marketing digital em Tavira, Algarve e em todo Portugal.";

export const Route = createFileRoute("/services/")({
  component: Services,
  head: () => {
    const head = buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/services",
      keywords:
        "serviços marketing digital, agência marketing algarve, agência marketing tavira, web design algarve, web design tavira, SEO algarve, google meu negócio, gestão redes sociais, branding, criação de websites, agência vela",
    });
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Serviços da Agência Vela",
      numberOfItems: servicesData.length,
      itemListElement: servicesData.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`/services/${s.slug}`),
        name: s.shortTitle,
      })),
    };
    const breadcrumbs = breadcrumbList([
      { name: "Início", path: "/" },
      { name: "Serviços", path: "/services" },
    ]);
    return {
      ...head,
      scripts: [jsonLdScript(itemList), jsonLdScript(breadcrumbs)],
    };
  },
});
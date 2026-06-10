// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import Contact from "../pages/Contact";
import { breadcrumbList, buildHead, jsonLdScript, SITE_NAME, SITE_URL } from "../lib/seo";

const TITLE = "Contactos | Agência Vela — Marketing Digital em Tavira e Algarve";
const DESCRIPTION =
  "Contacte a Agência Vela em Tavira, Algarve. Marketing digital, web design e SEO em Portugal. Resposta em 24h. Orçamentos gratuitos e sem compromisso.";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    ...buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/contact",
      keywords:
        "contacto agência vela, contacto marketing tavira, contacto agência marketing algarve, orçamento web design algarve, falar com agência marketing",
    }),
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: TITLE,
        url: `${SITE_URL}/contact`,
        about: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      }),
      jsonLdScript(breadcrumbList([{ name: "Início", path: "/" }, { name: "Contactos", path: "/contact" }])),
    ],
  }),
});

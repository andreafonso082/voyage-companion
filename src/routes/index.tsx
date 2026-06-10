// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home";
import { abs, buildHead, jsonLdScript, SITE_NAME, SITE_URL } from "../lib/seo";

const TITLE = "Agência Vela | Marketing Digital, Web Design e SEO no Algarve e Tavira";
const DESCRIPTION =
  "Agência de marketing digital em Tavira e Algarve. Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais e branding para pequenos negócios em Portugal.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const head = buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      keywords:
        "agência marketing algarve, agência marketing tavira, marketing digital algarve, web design algarve, web design tavira, criação de websites algarve, SEO algarve, agência criativa algarve, agência vela, empresa de sites algarve, marketing acessível",
    });
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
      image: abs("/og-image.png"),
      areaServed: [
        { "@type": "AdministrativeArea", name: "Algarve" },
        { "@type": "City", name: "Tavira" },
        { "@type": "Country", name: "Portugal" },
      ],
      address: { "@type": "PostalAddress", addressRegion: "Algarve", addressLocality: "Tavira", addressCountry: "PT" },
      sameAs: [],
    };
    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "pt-PT",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/services?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
    return { ...head, scripts: [jsonLdScript(localBusiness), jsonLdScript(website)] };
  },
});

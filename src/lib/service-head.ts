import { abs, buildHead, breadcrumbList, jsonLdScript, SITE_NAME } from "./seo";
import { getServiceBySlug } from "../data/servicesData";

export function buildServiceHead(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) {
    return buildHead({
      title: "Serviço não encontrado | Agência Vela",
      description: "Serviço não encontrado.",
      path: `/services/${slug}`,
      noindex: true,
    });
  }

  const path = `/services/${service.slug}`;
  const head = buildHead({
    title: service.seoTitle,
    description: service.seoDescription,
    path,
    image: typeof service.image === "string" ? service.image : undefined,
    keywords: service.keywords,
  });

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.shortTitle,
    description: service.seoDescription,
    url: abs(path),
    image: abs(typeof service.image === "string" ? service.image : "/og-image.png"),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Algarve" },
      { "@type": "City", name: "Tavira" },
      { "@type": "Country", name: "Portugal" },
    ],
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: abs("/"),
      areaServed: [
        { "@type": "AdministrativeArea", name: "Algarve" },
        { "@type": "City", name: "Tavira" },
        { "@type": "Country", name: "Portugal" },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbs = breadcrumbList([
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/services" },
    { name: service.shortTitle, path },
  ]);

  return {
    ...head,
    scripts: [
      jsonLdScript(serviceJsonLd),
      jsonLdScript(faqJsonLd),
      jsonLdScript(breadcrumbs),
    ],
  };
}
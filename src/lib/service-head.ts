import { abs, breadcrumbList, SITE_NAME, type SeoInput } from "./seo";
import { getServiceBySlug } from "../data/servicesData";

export function buildServiceSeo(slug: string): { input: SeoInput; jsonLd: unknown[] } {
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      input: {
        title: "Serviço não encontrado | Agência Vela",
        description: "Serviço não encontrado.",
        path: `/services/${slug}`,
        noindex: true,
      },
      jsonLd: [],
    };
  }

  const path = `/services/${service.slug}`;
  const input: SeoInput = {
    title: service.seoTitle,
    description: service.seoDescription,
    path,
    image: typeof service.image === "string" ? service.image : undefined,
    keywords: service.keywords,
  };

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

  return { input, jsonLd: [serviceJsonLd, faqJsonLd, breadcrumbs] };
}
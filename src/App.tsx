import { Routes, Route, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import Quote from "@/pages/Quote";
import FAQ from "@/pages/FAQ";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import TermsConditions from "@/pages/TermsConditions";
import NotFound from "@/pages/NotFound";

import { abs, breadcrumbList, SITE_NAME, SITE_URL } from "@/lib/seo";
import { buildServiceSeo } from "@/lib/service-head";
import { servicesData } from "@/data/servicesData";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["Vela", "Vela Agência", "Vela Marketing", "Agencia Vela"],
  legalName: "Agência Vela",
  brand: {
    "@type": "Brand",
    name: "Vela",
    alternateName: "Agência Vela",
  },
  slogan: "Vela — Marketing Digital no Algarve",
  description: "Vela (Agência Vela) é uma agência de marketing digital e web design em Tavira, Algarve.",
  url: SITE_URL,
  logo: abs("/favicon.png"),
  image: abs("/social-image.png"),
  email: "contacto@agencia-vela.com",
  telephone: "+351968334043",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tavira",
    addressRegion: "Algarve",
    postalCode: "8800",
    addressCountry: "PT",
  },
  sameAs: [
    "https://www.instagram.com/agencia.vela/",
    "https://www.facebook.com/agencia.vela",
    "https://www.linkedin.com/company/agencia-vela",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Vela",
  alternateName: ["Agência Vela", "Vela Marketing", "Vela Algarve"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "pt-PT",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

function HomePage() {
  return (
    <>
      <SeoHead
        title="Vela — Agência Vela | Marketing Digital, Web Design e SEO no Algarve e Tavira"
        description="Vela (Agência Vela) é a agência de marketing digital em Tavira e Algarve. Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais e branding para pequenos negócios em Portugal."
        path="/"
        keywords="vela, vela agência, vela marketing, vela algarve, vela tavira, vela web design, agência vela, agência marketing algarve, agência marketing tavira, marketing digital algarve, web design algarve, web design tavira, criação de websites algarve, SEO algarve"
        jsonLd={[organizationLd, websiteLd]}
      />
      <Home />
    </>
  );
}

function ServicesPage() {
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
  return (
    <>
      <SeoHead
        title="Serviços de Marketing Digital e Web Design no Algarve e Tavira | Agência Vela"
        description="Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais, branding e agentes IA. Agência de marketing digital em Tavira, Algarve e em todo Portugal."
        path="/services"
        keywords="serviços marketing digital, agência marketing algarve, web design algarve, SEO algarve, google meu negócio, gestão redes sociais, branding"
        jsonLd={[itemList, breadcrumbs]}
      />
      <Services />
    </>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { input, jsonLd } = buildServiceSeo(slug ?? "");
  return (
    <>
      <SeoHead {...input} jsonLd={jsonLd} />
      <ServiceDetail slug={slug} />
    </>
  );
}

function SimplePage({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoHead title={title} description={description} path={path} />
      {children}
    </>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Helmet>
        <html lang="pt" />
      </Helmet>
      <AnimatedBackground />
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<SimplePage title="Sobre Nós | Agência Vela" description="Conheça a Agência Vela, especialistas em marketing digital e web design em Tavira, Algarve." path="/about"><About /></SimplePage>} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<SimplePage title="Contactos | Agência Vela" description="Fale connosco. Agência de marketing digital em Tavira, Algarve." path="/contact"><Contact /></SimplePage>} />
        <Route path="/quote" element={<SimplePage title="Peça um Orçamento | Agência Vela" description="Peça um orçamento para o seu projeto de marketing digital ou web design." path="/quote"><Quote /></SimplePage>} />
        <Route path="/faq" element={<SimplePage title="Perguntas Frequentes | Agência Vela" description="Respostas às perguntas mais comuns sobre os nossos serviços." path="/faq"><FAQ /></SimplePage>} />
        <Route path="/privacy" element={<SimplePage title="Política de Privacidade | Agência Vela" description="Política de privacidade da Agência Vela." path="/privacy"><PrivacyPolicy /></SimplePage>} />
        <Route path="/cookies" element={<SimplePage title="Política de Cookies | Agência Vela" description="Política de cookies da Agência Vela." path="/cookies"><CookiePolicy /></SimplePage>} />
        <Route path="/terms" element={<SimplePage title="Termos e Condições | Agência Vela" description="Termos e condições da Agência Vela." path="/terms"><TermsConditions /></SimplePage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
}
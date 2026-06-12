// Pós-build: gera um index.html por rota com <title>, meta description,
// canonical, OG tags e JSON-LD já no HTML estático. Resolve o problema de
// indexação do Google em SPAs puras (todas as URLs devolviam o mesmo head).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const DIST = resolve("dist");
const SITE_URL = "https://agencia-vela.com";
const SITE_NAME = "Agência Vela";
const DEFAULT_OG = `${SITE_URL}/social-image.png`;

const abs = (p) => `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/favicon.png"),
  image: DEFAULT_OG,
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

const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

const services = [
  {
    slug: "criacao-de-websites",
    shortTitle: "Criação de Websites",
    title: "Criação de Websites e Web Design",
    seoTitle: "Criação de Websites Baratos e Profissionais | Web Design Algarve | Agência Vela",
    seoDescription:
      "Criação de websites profissionais e responsivos a partir de 700€. Web design moderno com SEO incluído. Empresa de sites em Tavira, Algarve e todo o Portugal.",
    keywords:
      "criação de websites, criacao de websites, web design algarve, web design tavira, sites baratos, empresa que faz sites, empresa de sites, criação de website, websites profissionais, web design portugal",
  },
  {
    slug: "seo-google-meu-negocio",
    shortTitle: "SEO & Google Meu Negócio",
    title: "SEO e Google Meu Negócio",
    seoTitle: "SEO e Google Meu Negócio | Otimização para Google no Algarve | Agência Vela",
    seoDescription:
      "Serviços de SEO e gestão de Google Meu Negócio para negócios em Tavira, Algarve e Portugal. Apareça no topo do Google com estratégias acessíveis e eficazes.",
    keywords:
      "SEO algarve, SEO tavira, google meu negocio, google meu negócio, otimização google, SEO portugal, posicionamento google, agência SEO, agencia SEO algarve",
  },
  {
    slug: "gestao-de-redes-sociais",
    shortTitle: "Gestão de Redes Sociais",
    title: "Gestão de Redes Sociais",
    seoTitle: "Gestão de Redes Sociais | Instagram e Facebook | Agência Vela Algarve",
    seoDescription:
      "Gestão profissional de redes sociais para negócios no Algarve e Portugal. Conteúdo visual de qualidade, calendário editorial e crescimento real da sua comunidade.",
    keywords:
      "gestão de redes sociais, gestao de redes sociais, gestão instagram, gestão facebook, social media algarve, social media tavira, agência redes sociais",
  },
  {
    slug: "branding-e-logotipos",
    shortTitle: "Branding e Logotipos",
    title: "Branding e Criação de Logotipos",
    seoTitle: "Criação de Logotipos e Branding | Design de Marca | Agência Vela Algarve",
    seoDescription:
      "Criação de logotipos profissionais e branding completo para pequenos negócios. Design de marca moderno e acessível em Tavira, Algarve e Portugal.",
    keywords:
      "criação de logo, criacao de logo, criação de logotipo, branding algarve, branding tavira, design de marca, identidade visual, logo profissional",
  },
  {
    slug: "google-ads",
    shortTitle: "Google Ads",
    title: "Criação e Gestão de Campanhas Google Ads",
    seoTitle: "Gestão de Google Ads | Campanhas Publicidade Google | Agência Vela",
    seoDescription:
      "Criação e gestão de campanhas Google Ads com cobrança ao desempenho. Aumente as vendas do seu negócio no Algarve e Portugal com publicidade otimizada.",
    keywords:
      "google ads, gestão google ads, campanhas google, publicidade google, google ads algarve, google ads portugal, agencia google ads",
  },
  {
    slug: "agentes-ia",
    shortTitle: "Agentes IA",
    title: "Integração de Agentes IA",
    seoTitle: "Agentes IA para Negócios | Chatbots e Automação | Agência Vela",
    seoDescription:
      "Integração de agentes de inteligência artificial para chat, WhatsApp e chamadas. Automatize a comunicação e processos do seu negócio com IA personalizada.",
    keywords:
      "agentes IA, inteligência artificial negócios, chatbot website, IA whatsapp, automação IA, agente IA portugal, IA para empresas",
  },
];

const routes = [
  {
    path: "/",
    title:
      "Agência Vela | Marketing Digital, Web Design e SEO no Algarve e Tavira",
    description:
      "Agência de marketing digital em Tavira e Algarve. Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais e branding para pequenos negócios em Portugal.",
    keywords:
      "agência marketing algarve, agência marketing tavira, marketing digital algarve, web design algarve, web design tavira, criação de websites algarve, SEO algarve, agência vela",
    jsonLd: [organizationLd],
  },
  {
    path: "/services",
    title:
      "Serviços de Marketing Digital e Web Design no Algarve e Tavira | Agência Vela",
    description:
      "Criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais, branding e agentes IA. Agência de marketing digital em Tavira, Algarve e em todo Portugal.",
    keywords:
      "serviços marketing digital, agência marketing algarve, web design algarve, SEO algarve, google meu negócio, gestão redes sociais, branding",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Serviços da Agência Vela",
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: abs(`/services/${s.slug}`),
          name: s.shortTitle,
        })),
      },
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/services" },
      ]),
    ],
  },
  {
    path: "/about",
    title: "Sobre Nós | Agência Vela",
    description:
      "Conheça a Agência Vela, especialistas em marketing digital e web design em Tavira, Algarve.",
  },
  {
    path: "/contact",
    title: "Contactos | Agência Vela",
    description:
      "Fale connosco. Agência de marketing digital em Tavira, Algarve.",
  },
  {
    path: "/quote",
    title: "Peça um Orçamento | Agência Vela",
    description:
      "Peça um orçamento para o seu projeto de marketing digital ou web design.",
  },
  {
    path: "/faq",
    title: "Perguntas Frequentes | Agência Vela",
    description:
      "Respostas às perguntas mais comuns sobre os nossos serviços.",
  },
  {
    path: "/privacy",
    title: "Política de Privacidade | Agência Vela",
    description: "Política de privacidade da Agência Vela.",
  },
  {
    path: "/cookies",
    title: "Política de Cookies | Agência Vela",
    description: "Política de cookies da Agência Vela.",
  },
  {
    path: "/terms",
    title: "Termos e Condições | Agência Vela",
    description: "Termos e condições da Agência Vela.",
  },
];

for (const s of services) {
  const path = `/services/${s.slug}`;
  routes.push({
    path,
    title: s.seoTitle,
    description: s.seoDescription,
    keywords: s.keywords,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.title,
        serviceType: s.shortTitle,
        description: s.seoDescription,
        url: abs(path),
        image: DEFAULT_OG,
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
      },
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/services" },
        { name: s.shortTitle, path },
      ]),
    ],
  });
}

const escapeHtml = (str) =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function buildHead(route) {
  const url = abs(route.path);
  const description = route.description;
  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${DEFAULT_OG}" />`,
    `<meta property="og:locale" content="pt_PT" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG}" />`,
  ];
  if (route.keywords) {
    tags.push(
      `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`,
    );
  }
  for (const data of route.jsonLd ?? []) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
    );
  }
  return tags.join("\n    ");
}

function injectHead(template, headHtml) {
  // Remove o <title> e a description existentes do template (vêm do index.html base)
  let out = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "");
  return out.replace(/<\/head>/i, `    ${headHtml}\n  </head>`);
}

if (!existsSync(resolve(DIST, "index.html"))) {
  console.error("[prerender-seo] dist/index.html não existe — corre vite build primeiro.");
  process.exit(1);
}

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

let written = 0;
for (const route of routes) {
  const html = injectHead(template, buildHead(route));
  const outPath =
    route.path === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  written++;
}

console.log(`[prerender-seo] gerados ${written} index.html (1 por rota).`);
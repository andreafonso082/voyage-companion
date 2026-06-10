// @ts-nocheck
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";

import appCss from "../styles.css?url";
import { SITE_NAME, SITE_URL, abs } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo correu mal. Tente atualizar ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              alternateName: ["Vela", "Agencia Vela", "Vela Marketing"],
              description:
                "Agência de marketing digital e web design em Tavira, Algarve. Criação de websites profissionais, SEO, Google Ads, gestão de redes sociais, branding e agentes de IA para empresas em Portugal.",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: abs("/favicon.png"),
                width: 512,
                height: 512,
              },
              image: abs("/og-image.png"),
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
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.1271,
                longitude: -7.6498,
              },
              areaServed: [
                { "@type": "Country", name: "Portugal" },
                { "@type": "AdministrativeArea", name: "Algarve" },
                { "@type": "City", name: "Tavira" },
                { "@type": "City", name: "Faro" },
                { "@type": "City", name: "Olhão" },
                { "@type": "City", name: "Loulé" },
                { "@type": "City", name: "Albufeira" },
                { "@type": "City", name: "Portimão" },
                { "@type": "City", name: "Lagos" },
                { "@type": "City", name: "Vila Real de Santo António" },
                { "@type": "City", name: "Lisboa" },
                { "@type": "City", name: "Porto" },
              ],
              serviceArea: [
                { "@type": "AdministrativeArea", name: "Algarve" },
                { "@type": "Country", name: "Portugal" },
              ],
              knowsLanguage: ["pt-PT", "en", "es"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                "https://www.instagram.com/agencia.vela/",
                "https://www.facebook.com/agencia.vela",
                "https://www.linkedin.com/company/agencia-vela",
              ],
              slogan:
                "Marketing digital e websites profissionais para empresas no Algarve e em Portugal.",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Serviços de marketing digital e web design",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Criação de Websites",
                      url: abs("/services/criacao-de-websites"),
                      description:
                        "Websites profissionais e baratos para empresas em Tavira, Algarve e Portugal. Web design responsivo a partir de 700€.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "SEO e Google Meu Negócio",
                      url: abs("/services/seo-google-meu-negocio"),
                      description:
                        "Otimização para Google e SEO local no Algarve para aparecer nas pesquisas dos seus clientes.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Gestão de Redes Sociais",
                      url: abs("/services/gestao-de-redes-sociais"),
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Google Ads",
                      url: abs("/services/google-ads"),
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Branding e Logotipos",
                      url: abs("/services/branding-e-logotipos"),
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Agentes de Inteligência Artificial",
                      url: abs("/services/agentes-ia"),
                    },
                  },
                ],
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              inLanguage: "pt-PT",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AnimatedBackground />
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Header />
          <Outlet />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

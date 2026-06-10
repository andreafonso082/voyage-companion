// Shared SEO helpers for SSR head() metadata.
// All canonical/og URLs are absolute against the official domain.

export const SITE_URL = "https://agencia-vela.com";
export const SITE_NAME = "Agência Vela";

export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  ogType?: "website" | "article" | "product";
  noindex?: boolean;
}

export function buildHead({
  title,
  description,
  path,
  image,
  keywords,
  ogType = "website",
  noindex = false,
}: SeoInput) {
  const url = abs(path);
  const ogImage = image ? (image.startsWith("http") ? image : abs(image)) : abs("/og-image.png");

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex
        ? "noindex, follow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:locale", content: "pt_PT" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (keywords) meta.push({ name: "keywords", content: keywords });

  return { meta, links: [{ rel: "canonical", href: url }] };
}

export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json" as const,
  children: JSON.stringify(data),
});

export const breadcrumbList = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});
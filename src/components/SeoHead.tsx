import { Helmet } from "react-helmet-async";
import { abs, buildHead, type SeoInput } from "@/lib/seo";

interface SeoHeadProps extends SeoInput {
  jsonLd?: unknown[];
}

export default function SeoHead({ jsonLd = [], ...input }: SeoHeadProps) {
  const { meta, links } = buildHead(input);

  // separate title from the rest
  let title: string | undefined;
  const tags: Array<Record<string, string>> = [];
  for (const m of meta) {
    if ("title" in m) title = m.title;
    else tags.push(m);
  }

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {tags.map((t, i) => {
        if (t.name) return <meta key={i} name={t.name} content={t.content} />;
        if (t.property) return <meta key={i} property={t.property} content={t.content} />;
        return null;
      })}
      {links.map((l, i) => (
        <link key={i} rel={l.rel} href={l.href} />
      ))}
      {jsonLd.map((data, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}

export { abs };
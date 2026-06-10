// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import About from "../pages/About";
import { breadcrumbList, buildHead, jsonLdScript } from "../lib/seo";

const TITLE = "Sobre a Agência Vela | Agência de Marketing Digital no Algarve e Tavira";
const DESCRIPTION =
  "Conheça a Agência Vela: equipa criativa de marketing digital, web design, SEO e branding no Algarve e Tavira. Acessível, próxima e focada em pequenos negócios em Portugal.";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    ...buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/about",
      keywords:
        "sobre agência vela, agência de marketing algarve, agência de marketing tavira, agência criativa algarve, equipa marketing digital algarve",
    }),
    scripts: [
      jsonLdScript(breadcrumbList([{ name: "Início", path: "/" }, { name: "Sobre", path: "/about" }])),
    ],
  }),
});

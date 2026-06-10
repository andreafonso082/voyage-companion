// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import TermsConditions from "../pages/TermsConditions";
import { buildHead } from "../lib/seo";

export const Route = createFileRoute("/terms")({
  component: TermsConditions,
  head: () =>
    buildHead({
      title: "Termos e Condições | Agência Vela",
      description:
        "Termos e condições de prestação dos serviços de marketing digital e web design da Agência Vela em Tavira, Algarve e Portugal.",
      path: "/terms",
      noindex: true,
    }),
});

// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import { buildHead } from "../lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
  head: () =>
    buildHead({
      title: "Política de Privacidade | Agência Vela",
      description:
        "Política de privacidade da Agência Vela. Como tratamos e protegemos os dados dos visitantes e clientes em Tavira, Algarve e Portugal.",
      path: "/privacy",
      noindex: true,
    }),
});

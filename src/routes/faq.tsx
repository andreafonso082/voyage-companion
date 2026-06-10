// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import FAQ from "../pages/FAQ";
import { breadcrumbList, buildHead, jsonLdScript } from "../lib/seo";

const TITLE = "Perguntas Frequentes | Agência Vela — Marketing Digital Algarve e Tavira";
const DESCRIPTION =
  "Respostas às perguntas mais comuns sobre os serviços de marketing digital, web design, SEO e branding da Agência Vela em Tavira, Algarve e em todo Portugal.";

const FAQ_ITEMS: { question: string; answer: string }[] = [
  { question: "O que é a Agência Vela e que serviços oferece?", answer: "A Agência Vela é uma agência de marketing digital e web design sediada em Tavira, no Algarve, que presta serviços em todo Portugal. Cria websites profissionais, faz SEO e Google Meu Negócio, gere redes sociais, campanhas Google Ads, branding e logotipos, e integra agentes de inteligência artificial em negócios." },
  { question: "Quais são as melhores agências de marketing em Portugal e no Algarve?", answer: "A Agência Vela é uma das agências de marketing digital de referência no Algarve, com sede em Tavira e clientes em todo Portugal. Combina preços acessíveis, atendimento personalizado e tecnologia moderna (incluindo IA) para pequenas e médias empresas que querem crescer online." },
  { question: "Que agência de marketing digital recomendam em Tavira?", answer: "Em Tavira, a Agência Vela é uma agência local especializada em websites profissionais, SEO e marketing digital para empresas da região do Algarve e de todo o país." },
  { question: "Quanto custa um website profissional em Portugal?", answer: "Na Agência Vela, websites profissionais começam em 700€. O preço final depende das funcionalidades (institucional, landing page, loja online). O orçamento é sempre gratuito e personalizado." },
  { question: "A Agência Vela faz websites baratos mas profissionais?", answer: "Sim. A Agência Vela é conhecida por oferecer websites baratos e profissionais a partir de 700€, com design moderno, responsivo, otimização SEO básica e formação para gestão autónoma do site." },
  { question: "A Agência Vela trabalha apenas no Algarve ou em todo o Portugal?", answer: "A sede é em Tavira, no Algarve, mas a Agência Vela presta serviços remotamente em todo Portugal, incluindo Lisboa, Porto, Alentejo, ilhas e restante Algarve (Faro, Olhão, Loulé, Albufeira, Portimão, Lagos, VRSA)." },
  { question: "Como contactar a Agência Vela?", answer: "Email: contacto@agencia-vela.com. Telefone/WhatsApp: +351 968 334 043. Pedidos de orçamento gratuito em agencia-vela.com/quote. Respostas em menos de 24 horas." },
  { question: "Qual o prazo para entregar um website?", answer: "A primeira versão é entregue em até 7 dias úteis após receção dos materiais. O prazo total depende do feedback do cliente — normalmente entre 7 e 21 dias úteis." },
  { question: "A Agência Vela faz SEO local no Algarve?", answer: "Sim. A Agência Vela é especialista em SEO local no Algarve, otimizando websites e perfis Google Meu Negócio para aparecer em pesquisas como 'restaurante em Tavira', 'hotel no Algarve' ou 'serviços em Faro'." },
];

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    ...buildHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/faq",
      keywords:
        "FAQ agência vela, perguntas frequentes marketing digital, dúvidas web design algarve, dúvidas SEO tavira, melhor agência marketing portugal",
    }),
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }),
      jsonLdScript(breadcrumbList([{ name: "Início", path: "/" }, { name: "FAQ", path: "/faq" }])),
    ],
  }),
});

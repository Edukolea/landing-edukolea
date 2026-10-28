// Local instrumentation only. No analytics provider, cookies or network requests.
export type Placement = "hero" | "nav" | "service" | "footer";
type Event =
  | { event: "demo_cta_click"; placement: Placement }
  | { event: "service_interest_select"; service_slug: "aula_lista_ia" | "kolea_en_pares" | "kolea_reporta" }
  | { event: "contact_outbound_click"; contact_method: "email" | "whatsapp" };
export function measure(detail: Event) {
  window.dispatchEvent(new CustomEvent("edukole:measurement", { detail }));
}
const rules: Record<string, RegExp> = {
  utm_source: /^(instagram|facebook|tiktok|linkedin)$/,
  utm_medium: /^(organic_social|paid_social)$/,
  utm_campaign: /^lanzamiento_\d{4}_\d{2}$/,
  utm_content: /^(post|reel|story|video|carousel)_\d{2}$/,
};
// Retain controlled campaign codes in this tab for the future receiver.
// Never persist arbitrary URL values or send these values to analytics.
export function preserveCampaign() {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    for (const [key, rule] of Object.entries(rules)) {
      const value = params.get(key);
      if (value && rule.test(value)) campaign[key] = value;
    }
    if (Object.keys(campaign).length) sessionStorage.setItem("edukole:campaign", JSON.stringify(campaign));
  } catch { /* Storage is optional when the browser blocks it. */ }
}
// generate_lead deliberately has no emitter until a verified receiver exists.

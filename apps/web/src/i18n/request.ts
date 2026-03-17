import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "./routing";

async function loadMessages(locale: string) {
  try {
    switch (locale) {
      case "pl":
        return (await import("./messages/pl.json")).default;
      case "en":
        return (await import("./messages/en.json")).default;
      case "uk":
        return (await import("./messages/uk.json")).default;
      default:
        return {};
    }
  } catch {
    return {};
  }
}

export default getRequestConfig(async ({ locale }) => {
  // If no locale is provided (root path), use the default locale
  const resolvedLocale = locale || routing.defaultLocale;

  // Validate that the incoming locale parameter is valid
  if (!routing.locales.includes(resolvedLocale as (typeof routing.locales)[number])) {
    notFound();
  }

  return {
    locale: resolvedLocale,
    messages: await loadMessages(resolvedLocale),
  };
});

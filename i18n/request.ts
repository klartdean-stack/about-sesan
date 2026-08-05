import { getRequestConfig } from "next-intl/server";
import enMessages from "./messages/en.json";
import kmMessages from "./messages/km.json";

const supportedLocales = ["en", "km"] as const;

type SupportedLocale = (typeof supportedLocales)[number];

const allMessages = {
  en: enMessages,
  km: kmMessages,
};

function isSupportedLocale(
  locale: string
): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale && isSupportedLocale(requestedLocale)
      ? requestedLocale
      : "en";

  return {
    locale,
    messages: allMessages[locale],
  };
});
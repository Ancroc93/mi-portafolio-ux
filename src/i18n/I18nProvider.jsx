import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, supportedLocales, translations } from "./translations";

const I18nContext = createContext(null);

const normalizeLocale = (locale) => {
  if (!locale) return defaultLocale;
  const lower = locale.toLowerCase();
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("en")) return "en";
  return defaultLocale;
};

const getInitialLocale = () => {
  if (typeof window === "undefined") return defaultLocale;
  const stored = window.localStorage.getItem("locale");
  if (stored && supportedLocales.includes(stored)) return stored;
  return normalizeLocale(window.navigator?.language);
};

const getTranslation = (locale, key) => {
  const value = key.split(".").reduce((acc, part) => acc?.[part], translations[locale]);
  return value ?? key;
};

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useMemo(() => (key) => getTranslation(locale, key), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t, availableLocales: supportedLocales }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

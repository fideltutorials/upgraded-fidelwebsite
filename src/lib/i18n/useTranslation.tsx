"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./en.json";
import am from "./am.json";

type Language = "en" | "am";

interface TranslationContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, any> = { en, am };

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fidel_lang") as Language | null;
      if (saved === "en" || saved === "am") {
        setLangState(saved);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("fidel_lang", newLang);
    }
  };

  const t = (keyStr: string): string => {
    const keys = keyStr.split(".");
    let current = translations[lang];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English dictionary if Amharic key missing
        let englishFallback = translations["en"];
        for (const fallbackKey of keys) {
          if (englishFallback && englishFallback[fallbackKey] !== undefined) {
            englishFallback = englishFallback[fallbackKey];
          } else {
            return keyStr;
          }
        }
        return englishFallback;
      }
    }
    return current;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}

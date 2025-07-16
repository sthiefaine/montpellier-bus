import { useLanguage } from "../contexts/LanguageContext";
import fr from "../translations/locales/fr";
import en from "../translations/locales/en";
import es from "../translations/locales/es";
import de from "../translations/locales/de";
import pt from "../translations/locales/pt";
import zh from "../translations/locales/zh";
import ja from "../translations/locales/ja";
import ru from "../translations/locales/ru";

const translations = {
  fr,
  en,
  es,
  de,
  pt,
  zh,
  ja,
  ru,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string, params?: Record<string, string | number>) => {
    // Diviser la clé en segments (ex: "common.languages.fr")
    const segments = key.split(".");

    // Commencer par les traductions françaises comme fallback
    let value: any = en;

    // Essayer d'abord avec la langue sélectionnée
    if (translations[language]) {
      value = translations[language];
    }

    // Parcourir les segments pour trouver la valeur
    for (const segment of segments) {
      if (value && typeof value === "object") {
        value = value[segment];
      } else {
        value = segments.reduce((obj, seg) => obj?.[seg], en);
        break;
      }
    }

    if (typeof value === "string" && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, key) =>
        String(params[key] || "")
      );
    }

    return value || key;
  };

  return { t };
};

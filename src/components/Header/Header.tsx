import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [localTime, setLocalTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLocale = () => {
    switch (language) {
      case 'fr':
        return 'fr-FR';
      case 'es':
        return 'es-ES';
      case 'de':
        return 'de-DE';
      case 'pt':
        return 'pt-BR';
      case 'zh':
        return 'zh-CN';
      case 'ja':
        return 'ja-JP';
      case 'ru':
        return 'ru-RU';
      default:
        return 'en-GB';
    }
  };

  const formattedTime = localTime.toLocaleTimeString(getLocale(), {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDate = localTime.toLocaleDateString(getLocale(), {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-10 w-full bg-blue-600 text-white shadow-md"
      role="banner"
    >
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div tabIndex={0}>
            <h1 className="text-2xl font-bold" role="heading" aria-level={1}>
              Montpellier Sabines
            </h1>
            <p 
              className="text-s capitalize" 
              role="contentinfo"
              aria-label={t("common.today")}
            >
              {formattedDate}
            </p>
          </div>
          <div 
            className="text-right"
            tabIndex={0}
            role="timer"
            aria-label={`${t("common.time")} ${formattedTime}`}
          >
            <p className="text-s">{t("common.time")} :</p>
            <div className="text-xl font-bold">{formattedTime}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from "react";
import { Bus } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";
import { useLanguage } from "../../contexts/LanguageContext";

interface StatusDateProps {
  bus: Bus;
}

const StatusDate = ({ bus }: StatusDateProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const busDate = bus.scheduledDateTime;
  const busDay = new Date(
    busDate.getFullYear(),
    busDate.getMonth(),
    busDate.getDate()
  );

  // Déterminer le texte pour la date
  let dateText = "";
  if (busDay.getTime() === today.getTime()) {
    return null; // Ne pas afficher la date si c'est aujourd'hui
  } else if (busDay.getTime() === tomorrow.getTime()) {
    dateText = t("common.tomorrow");
  } else if (busDay.getTime() === yesterday.getTime()) {
    dateText = t("common.yesterday");
  } else {
    dateText = busDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB', {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className={`text-sm px-3 py-1 rounded-full text-black ${
      dateText === "hier" ? "bg-purple-400" : "bg-yellow-400"
    }`}>
      {dateText}
    </div>
  );
};

export default StatusDate;

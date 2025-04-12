import React from "react";
import { formatTimeHHMM } from "../../helpers/utils";

interface FooterProps {
  currentTime: Date;
  isOnline?: boolean;
  cacheTimestamp?: Date | null;
}

const Footer = ({
  currentTime,
  isOnline = true,
  cacheTimestamp = null,
}: FooterProps) => {
  const getCacheAgeDisplay = () => {
    if (!cacheTimestamp) return "";

    const ageInMinutes = Math.floor(
      (new Date().getTime() - cacheTimestamp.getTime()) / (60 * 1000)
    );

    if (ageInMinutes < 1) return "";
    if (ageInMinutes === 1) return "il y a 1 minute";
    if (ageInMinutes < 60) return `il y a ${ageInMinutes} minutes`;

    const ageInHours = Math.floor(ageInMinutes / 60);
    if (ageInHours === 1) return "il y a 1 heure";
    if (ageInHours < 24) return `il y a ${ageInHours} heures`;

    const ageInDays = Math.floor(ageInHours / 24);
    if (ageInDays === 1) return "il y a 1 jour";
    return `il y a ${ageInDays} jours`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm border-t border-gray-200 py-1 px-2 text-center text-xs text-gray-500 z-10">
      Mise à jour: {formatTimeHHMM(currentTime)}
      {!isOnline && cacheTimestamp && ` (Cache ${getCacheAgeDisplay()})`}
    </div>
  );
};

export default Footer;

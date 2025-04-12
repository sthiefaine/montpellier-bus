import React from "react";
import { StatusType } from "../../types";

interface StatusBadgeProps {
  status: StatusType;
  delayMinutes?: number;
}

const StatusBadge = ({ status, delayMinutes = 0 }: StatusBadgeProps) => {
  let backgroundColor = "";
  let textColor = "";
  let statusText = "";
  let delayText = "";

  const formatDelay = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours}h${remainingMinutes}min`
        : `${hours}h`;
    }
  };

  switch (status) {
    case "ON_TIME":
      backgroundColor = "bg-green-100";
      textColor = "text-green-800";
      statusText = "À l'heure";
      break;
    case "LATE":
      backgroundColor = "bg-red-100";
      textColor = "text-red-800";
      statusText = "Retard";
      if (delayMinutes) {
        delayText = formatDelay(delayMinutes);
      }
      break;
    case "EARLY":
      backgroundColor = "bg-blue-100";
      textColor = "text-blue-800";
      statusText = "Avance";
      if (delayMinutes) {
        delayText = formatDelay(Math.abs(delayMinutes));
      }
      break;
    case "CANCELLED":
      backgroundColor = "bg-red-600";
      textColor = "text-white";
      statusText = "Annulé";
      break;
    case "PASSED":
      backgroundColor = "bg-gray-200";
      textColor = "text-gray-600";
      statusText = "Passé";
      break;
    default:
      backgroundColor = "bg-gray-100";
      textColor = "text-gray-800";
      statusText = "Programmé";
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${backgroundColor} ${textColor}`}
    >
      {delayText && delayMinutes >= 60 ? (
        <div className="flex flex-col items-center text-center">
          <span>{statusText} {delayText}</span>
        </div>
      ) : (
        <span>
          {statusText} {delayText}
        </span>
      )}
    </span>
  );
};

export default StatusBadge;

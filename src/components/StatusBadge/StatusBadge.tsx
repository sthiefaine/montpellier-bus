import React from "react";
import { StatusType } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";

interface StatusBadgeProps {
  status: StatusType;
  delayMinutes?: number;
  isTheoretical?: boolean;
}

const StatusBadge = ({ status, delayMinutes, isTheoretical }: StatusBadgeProps) => {
  const { t } = useTranslation();

  const getStatusColor = () => {
    if (isTheoretical) {
      return "bg-gray-100 text-gray-800";
    }
    switch (status) {
      case "ON_TIME":
        return "bg-green-100 text-green-800";
      case "LATE":
        return "bg-red-100 text-red-800";
      case "EARLY":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-600 text-white";
      case "PASSED":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDelay = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (hours === 1) {
        if (remainingMinutes === 1) {
          return `${hours}h${remainingMinutes}${t("bus.delay.minute")}`;
        }
        return `${hours}h${
          remainingMinutes > 0
            ? `${remainingMinutes}${t("bus.delay.minutes")}`
            : ""
        }`;
      } else {
        if (remainingMinutes === 1) {
          return `${hours}h${remainingMinutes}${t("bus.delay.minute")}`;
        }
        return `${hours}h${
          remainingMinutes > 0
            ? `${remainingMinutes}${t("bus.delay.minutes")}`
            : ""
        }`;
      }
    }
    if (minutes === 1) {
      return `${minutes}${t("bus.delay.minute")}`;
    }
    return `${minutes}${t("bus.delay.minutes")}`;
  };

  const getStatusText = () => {
    if (isTheoretical) {
      return t("bus.status.programmed");
    }
    switch (status) {
      case "ON_TIME":
        return t("bus.status.onTime");
      case "LATE":
        return delayMinutes
          ? `${t("bus.delay.late")} ${formatDelay(Math.abs(delayMinutes))}`
          : t("bus.status.delayed");
      case "EARLY":
        return delayMinutes
          ? `${t("bus.delay.early")} ${formatDelay(Math.abs(delayMinutes))}`
          : t("bus.status.delayed");
      case "CANCELLED":
        return t("bus.status.cancelled");
      case "PASSED":
        return t("bus.status.passed");
      case "UNKNOWN":
        return t("bus.status.programmed");
      default:
        return t("bus.status.programmed");
    }
  };

  const getStatusDescription = () => {
    if (isTheoretical) {
      return t("bus.status.description.programmed");
    }
    switch (status) {
      case "ON_TIME":
        return t("bus.status.description.onTime");
      case "LATE":
        return delayMinutes
          ? t("bus.status.description.late", { minutes: Math.abs(delayMinutes) })
          : t("bus.status.description.delayed");
      case "EARLY":
        return delayMinutes
          ? t("bus.status.description.early", { minutes: Math.abs(delayMinutes) })
          : t("bus.status.description.early");
      case "CANCELLED":
        return t("bus.status.description.cancelled");
      case "PASSED":
        return t("bus.status.description.passed");
      case "UNKNOWN":
        return t("bus.status.description.unknown");
      default:
        return t("bus.status.description.unknown");
    }
  };

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={getStatusDescription()}
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;

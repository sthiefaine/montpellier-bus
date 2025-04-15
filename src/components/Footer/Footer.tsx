import React from "react";
import { formatTimeHHMM } from "../../helpers/utils";
import ServerStatus from "../ServerStatus/ServerStatus";
import { ServerStatusEnum } from "../../types";
import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

interface FooterProps {
  currentTime: Date;
  isOnline?: boolean;
  cacheTimestamp?: Date | null;
  serverStatus: ServerStatusEnum;
  isRefreshing?: boolean;
}

const Footer = ({
  currentTime,
  isOnline = true,
  cacheTimestamp = null,
  serverStatus,
  isRefreshing = false,
}: FooterProps) => {
  const { t } = useTranslation();

  const getCacheAgeDisplay = () => {
    if (!cacheTimestamp) return "";

    const ageInMinutes = Math.floor(
      (new Date().getTime() - cacheTimestamp.getTime()) / (60 * 1000)
    );

    if (ageInMinutes < 1) return t("common.ago.now");
    if (ageInMinutes === 1) return t("common.ago.minute", { minutes: 1 });
    if (ageInMinutes < 60) return t("common.ago.minutes", { minutes: ageInMinutes });

    const ageInHours = Math.floor(ageInMinutes / 60);
    if (ageInHours === 1) return t("common.ago.hour", { hours: 1 });
    if (ageInHours < 24) return t("common.ago.hours", { hours: ageInHours });

    const ageInDays = Math.floor(ageInHours / 24);
    if (ageInDays === 1) return t("common.ago.day", { days: 1 });
    return t("common.ago.days", { days: ageInDays });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm border-t border-gray-200 py-2 px-2 text-center text-xs text-gray-500 z-10">
      <div className="max-w-2xl mx-auto px-2">
        <div className="grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <ServerStatus
              serverStatus={serverStatus}
              isRefreshing={isRefreshing}
              className="text-xs"
            />
          </div>
          <div className="text-center">
            {formatTimeHHMM(currentTime)}
            {!isOnline && cacheTimestamp && ` (${t("common.cache")} ${getCacheAgeDisplay()})`}
          </div>
          <div className="flex justify-end">
            <Link to="/infos" className="text-blue-600 hover:text-blue-800">
              {t("common.info")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

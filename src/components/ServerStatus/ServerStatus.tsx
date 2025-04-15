import React from "react";
import { ServerStatusEnum } from "../../types";
import useOnlineStatus from "../../hooks/useOnlineStatus";

interface ServerStatusProps {
  className?: string;
  serverStatus: ServerStatusEnum;
  isRefreshing?: boolean;
}

const ServerStatus = ({
  className = "",
  serverStatus,
  isRefreshing = false,
}: ServerStatusProps) => {
  const isOnline = useOnlineStatus();

  const getStatus = () => {
    if (!isOnline) {
      return {
        color: "bg-orange-500",
        animate: "",
        text: "Hors ligne",
      };
    }

    if (isRefreshing) {
      return {
        color: "bg-blue-500",
        animate: "animate-pulse",
        text: "Mise à jour...",
      };
    }

    switch (serverStatus) {
      case ServerStatusEnum.CONNECTED:
        return {
          color: "bg-green-500",
          animate: "",
          text: "Connecté",
        };
      case ServerStatusEnum.DISCONNECTED:
        return {
          color: "bg-red-500",
          animate: "",
          text: "Déconnecté",
        };
      default:
        return {
          color: "bg-yellow-500",
          animate: "animate-pulse",
          text: "Connexion...",
        };
    }
  };

  const status = getStatus();

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`h-2 w-2 rounded-full mr-1 ${status.color} ${status.animate}`}
      />
      <span className="text-xs font-medium">{status.text}</span>
    </div>
  );
};

export default ServerStatus;

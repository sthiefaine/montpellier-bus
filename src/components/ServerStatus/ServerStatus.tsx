import React from "react";
import { ServerStatusEnum } from "../../types";

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
  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`h-3 w-3 rounded-full mr-2 ${
          isRefreshing
            ? "bg-blue-500 animate-pulse"
            : serverStatus === ServerStatusEnum.CONNECTED
            ? "bg-green-500"
            : serverStatus === ServerStatusEnum.DISCONNECTED
            ? "bg-red-500"
            : "bg-yellow-500 animate-pulse"
        }`}
      />
      <span className="text-xs font-medium">
        {isRefreshing
          ? "Mise à jour en cours..."
          : serverStatus === ServerStatusEnum.CONNECTED
          ? "Serveur connecté"
          : serverStatus === ServerStatusEnum.DISCONNECTED
          ? "Serveur déconnecté"
          : "Connexion..."}
      </span>
    </div>
  );
};

export default ServerStatus;

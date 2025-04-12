import React, { useSyncExternalStore } from "react";
import { ServerStatusEnum } from "../../types";

interface ServerStatusProps {
  className?: string;
  serverStatus: ServerStatusEnum;
  isRefreshing?: boolean;
}

// Création d'un store pour l'état de la connexion réseau
const createNetworkStatusStore = () => {
  const subscribers = new Set<() => void>();

  let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    
    window.addEventListener('online', () => {
      isOnline = true;
      notifySubscribers();
    });
    
    window.addEventListener('offline', () => {
      isOnline = false;
      notifySubscribers();
    });
    
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        window.removeEventListener('online', notifySubscribers);
        window.removeEventListener('offline', notifySubscribers);
      }
    };
  };

  // Notification de tous les abonnés
  const notifySubscribers = () => {
    subscribers.forEach(callback => callback());
  };

  const getSnapshot = () => isOnline;

  return {
    subscribe,
    getSnapshot,
  };
};

const networkStore = createNetworkStatusStore();

const ServerStatus = ({
  className = "",
  serverStatus,
  isRefreshing = false,
}: ServerStatusProps) => {
  const isOnline = useSyncExternalStore(
    networkStore.subscribe,
    networkStore.getSnapshot
  );

  const getStatus = () => {
    if (!isOnline) {
      return {
        color: "bg-gray-500",
        animate: "",
        text: "Hors ligne"
      };
    }

    if (isRefreshing) {
      return {
        color: "bg-blue-500",
        animate: "animate-pulse",
        text: "Mise à jour en cours..."
      };
    }
    switch (serverStatus) {
      case ServerStatusEnum.CONNECTED:
        return {
          color: "bg-green-500",
          animate: "",
          text: "Serveur connecté"
        };
      case ServerStatusEnum.DISCONNECTED:
        return {
          color: "bg-red-500",
          animate: "",
          text: "Serveur déconnecté"
        };
      default:
        return {
          color: "bg-yellow-500",
          animate: "animate-pulse",
          text: "Connexion..."
        };
    }
  };

  const status = getStatus();

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`h-3 w-3 rounded-full mr-2 ${status.color} ${status.animate}`}
      />
      <span className="text-xs font-medium">
        {status.text}
      </span>
    </div>
  );
};

export default ServerStatus;
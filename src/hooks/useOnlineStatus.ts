import { useSyncExternalStore } from "react";

/**
 * Hook personnalisé pour suivre l'état de la connexion réseau
 * @returns {boolean} - true si l'utilisateur est en ligne, false sinon
 */
export function useOnlineStatus(): boolean {
  // Création d'une fonction de souscription pour les événements de connexion
  const subscribe = (callback: () => void) => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);

    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  };

  // Obtention de l'état actuel
  const getSnapshot = () => navigator.onLine;

  // Utilisation du hook useSyncExternalStore pour connecter React à cet état externe
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useOnlineStatus;

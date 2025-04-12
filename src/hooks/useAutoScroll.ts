import { useEffect, useRef, useState } from "react";

/**
 * Hook personnalisé pour faire défiler automatiquement vers le premier bus non passé
 * @param filteredBuses - Liste des bus filtrés
 * @param loading - État de chargement
 * @returns Les refs à utiliser et l'état de défilement
 */
const useAutoScroll = (filteredBuses: any[], loading: boolean) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAttempted = useRef(false);

  const firstActiveBusIndex = filteredBuses.findIndex((bus) => {
    const busDateTime = bus.delayedDateISO
      ? new Date(bus.delayedDateISO)
      : bus.scheduledDateTime;
    return busDateTime >= new Date();
  });

  const busRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (busRefs.current.length !== filteredBuses.length) {
    busRefs.current = Array(filteredBuses.length).fill(null);
  }

  const scrollToActiveBus = () => {
    if (
      !hasScrolled &&
      filteredBuses.length > 0 &&
      firstActiveBusIndex !== -1 &&
      busRefs.current[firstActiveBusIndex]
    ) {
      const headerOffset = 140;
      const element = busRefs.current[firstActiveBusIndex];

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setHasScrolled(true);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      scrollAttempted.current = false;
      setHasScrolled(false);
    }
  }, [loading, filteredBuses]);

  useEffect(() => {
    if (!loading && !hasScrolled && !scrollAttempted.current && firstActiveBusIndex !== -1) {
      scrollAttempted.current = true;

      const handleDOMReady = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToActiveBus);
        });
      };

      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        handleDOMReady();
      } else {
        document.addEventListener("DOMContentLoaded", handleDOMReady, {
          once: true,
        });
        return () =>
          document.removeEventListener("DOMContentLoaded", handleDOMReady);
      }
    }
  }, [loading, filteredBuses, firstActiveBusIndex, hasScrolled]);

  return {
    busRefs,
    scrollContainerRef,
    firstActiveBusIndex,
    hasScrolled,
    scrollToActiveBus,
  };
};

export default useAutoScroll;
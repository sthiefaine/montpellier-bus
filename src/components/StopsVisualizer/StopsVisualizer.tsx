import React, { useRef, useMemo } from "react";
import { Stop, StatusType } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";

interface StopsVisualizerProps {
  stops: Stop[];
  currentIndex: number;
  alreadyPassed?: boolean;
  busStatus?: StatusType;
  onStopClick?: (index: number) => void;
  onKeyDown?: (event: React.KeyboardEvent, index: number) => void;
}

const StopsVisualizer = ({
  stops,
  currentIndex,
  alreadyPassed = false,
  busStatus = "ON_TIME",
  onStopClick = () => {},
  onKeyDown = () => {},
}: StopsVisualizerProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const totalStops = stops.length;

  // Trouver l'index de la station choisie
  const selectedStationIndex = stops.findIndex((stop) =>
    stop.stop.name.toLowerCase().includes("montpellier")
  );

  const disableAnimation = alreadyPassed || busStatus === "CANCELLED";

  if (!stops || stops.length === 0) {
    return null;
  }

  // Pré-calculer les styles des points
  const stopPoints = useMemo(() => {
    return stops.map((stop, index) => {
      let pointColor = "bg-gray-400";
      let pointSize = "h-2 w-2";
      let animation = "";
      let ariaLabel = "";

      // Priorité de couleur: selectedStationIndex > Départ > Terminus > Autres
      if (index === selectedStationIndex) {
        pointColor = alreadyPassed ? "bg-green-500" : "bg-green-500";
        pointSize = "h-2.5 w-2.5";
        ariaLabel = t("bus.stops.selected", { stop: stop.stop.name });
      } else if (index === 0) {
        // Départ
        pointColor = alreadyPassed ? "bg-gray-300" : "bg-gray-400";
        pointSize = "h-3 w-3";
        ariaLabel = t("bus.stops.departure", { stop: stop.stop.name });
      } else if (index === totalStops - 1) {
        // Terminus
        pointColor = alreadyPassed ? "bg-gray-800" : "bg-black";
        pointSize = "h-3 w-3";
        ariaLabel = t("bus.stops.terminus", { stop: stop.stop.name });
      } else {
        ariaLabel = t("bus.stops.intermediate", { 
          stop: stop.stop.name,
          position: index + 1,
          total: totalStops
        });
      }

      if (index === currentIndex && !disableAnimation) {
        pointColor = "bg-blue-500";
        animation = "animate-pulse";
        pointSize =
          index === 0 || index === totalStops - 1
            ? "h-3.5 w-3.5"
            : "h-2.5 w-2.5";
        ariaLabel = t("bus.stops.current", { 
          stop: stop.stop.name,
          position: index + 1,
          total: totalStops
        });
      }

      return {
        pointColor,
        pointSize,
        animation,
        ariaLabel,
        index,
      };
    });
  }, [
    stops,
    currentIndex,
    selectedStationIndex,
    alreadyPassed,
    disableAnimation,
    totalStops,
    t
  ]);

  return (
    <div 
      className="relative w-full h-4" 
      ref={ref}
      role="list"
      aria-label={t("bus.stops.visualizer")}
    >
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 ${
          alreadyPassed ? "bg-gray-300" : "bg-gray-200"
        } w-full will-change-contents`}
        aria-hidden="true"
      ></div>
      <div 
        className="absolute top-0 left-0 w-full h-full flex justify-between items-center will-change-contents"
        role="list"
      >
        {stopPoints.map(({ pointColor, pointSize, animation, ariaLabel, index }) => (
          <div
            key={index}
            className="relative flex items-center justify-center"
            role="listitem"
          >
            <button
              className={`rounded-full ${pointColor} ${pointSize} ${animation} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              style={{
                willChange: animation ? "opacity" : "auto",
                contain: "layout style paint",
              }}
              onClick={() => onStopClick(index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              aria-label={ariaLabel}
              aria-current={index === currentIndex ? "step" : undefined}
              tabIndex={0}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopsVisualizer;

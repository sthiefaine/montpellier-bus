import React, { useRef, useMemo } from "react";
import { Stop, StatusType } from "../../types";

interface StopsVisualizerProps {
  stops: Stop[];
  currentIndex: number;
  alreadyPassed?: boolean;
  busStatus?: StatusType;
  onStopClick?: (index: number) => void;
}

const StopsVisualizer = ({
  stops,
  currentIndex,
  alreadyPassed = false,
  busStatus = "ON_TIME",
  onStopClick = () => {},
}: StopsVisualizerProps) => {
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

      // Priorité de couleur: selectedStationIndex > Départ > Terminus > Autres
      if (index === selectedStationIndex) {
        pointColor = alreadyPassed ? "bg-green-500" : "bg-green-500";
        pointSize = "h-2.5 w-2.5";
      } else if (index === 0) {
        // Départ
        pointColor = alreadyPassed ? "bg-gray-300" : "bg-gray-400";
        pointSize = "h-3 w-3";
      } else if (index === totalStops - 1) {
        // Terminus
        pointColor = alreadyPassed ? "bg-gray-800" : "bg-black";
        pointSize = "h-3 w-3";
      }

      if (index === currentIndex && !disableAnimation) {
        pointColor = "bg-blue-500";
        animation = "animate-pulse";
        pointSize =
          index === 0 || index === totalStops - 1
            ? "h-3.5 w-3.5"
            : "h-2.5 w-2.5";
      }

      return {
        pointColor,
        pointSize,
        animation,
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
  ]);

  return (
    <div className="relative w-full h-4" ref={ref}>
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 ${
          alreadyPassed ? "bg-gray-300" : "bg-gray-200"
        } w-full will-change-contents`}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center will-change-contents">
        {stopPoints.map(({ pointColor, pointSize, animation, index }) => (
          <div
            key={index}
            className="relative flex items-center justify-center"
          >
            <div
              className={`rounded-full ${pointColor} ${pointSize} ${animation} cursor-pointer`}
              style={{
                willChange: animation ? "opacity" : "auto",
                contain: "layout style paint",
              }}
              onClick={() => onStopClick(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopsVisualizer;

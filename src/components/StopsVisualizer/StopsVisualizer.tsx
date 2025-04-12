import React from "react";
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
  const totalStops = stops.length;

  // Trouver l'index de la station choisie
  const selectedStationIndex = stops.findIndex((stop) =>
    stop.stop.name.toLowerCase().includes("montpellier")
  );

  // Désactiver l'animation si le bus est déjà passé ou annulé
  const disableAnimation = alreadyPassed || busStatus === "CANCELLED";

  // Si pas d'arrêts, ne rien afficher
  if (!stops || stops.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-4">
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 ${
          alreadyPassed ? "bg-gray-300" : "bg-gray-200"
        } w-full`}
      ></div>
      {/* Points pour chaque arrêt */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center">
        {stops.map((stop, index) => {
          // Variables pour le style
          let pointColor = "bg-gray-400";
          let pointSize = "h-2 w-2";
          let animation = "";

          // Priorité de couleur: selectedStationIndex > Départ > Terminus > Autres
          if (index === selectedStationIndex) {
            pointColor = alreadyPassed ? "bg-green-300" : "bg-green-500";
            pointSize = "h-2.5 w-2.5";
          } else if (index === 0) {
            // Départ
            pointColor = alreadyPassed ? "bg-gray-800" : "bg-black";
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

          return (
            <div
              key={index}
              className="relative flex items-center justify-center"
            >
              <div
                className={`rounded-full ${pointColor} ${pointSize} ${animation} transition-all duration-500 cursor-pointer`}
                onClick={() => onStopClick(index)}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StopsVisualizer;

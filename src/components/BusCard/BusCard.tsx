import React, { useState, useEffect } from "react";
import { Bus, StatusType } from "../../types";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Stop } from "../../types";
import StatusTime from "../StatusTime/StatusTime";
import StatusDate from "../StatusDate/StatusDate";
import BusIdentifier from "../BusIdentifier/BusIdentifier";
import StopsVisualizer from "../StopsVisualizer/StopsVisualizer";
import NumberFlow from "@number-flow/react";

interface BusCardProps {
  bus: Bus;
  stops: Stop[];
}

const BusCard = ({ bus, stops }: BusCardProps) => {
  const terminusStop =
    stops && stops.length > 0 ? stops[stops.length - 1].stop.name : "Inconnu";

  const alreadyPassed = bus.delayedDateISO
    ? new Date(bus.delayedDateISO) < new Date()
    : bus.scheduledDateTime < new Date();

  const busStatus = alreadyPassed ? "PASSED" : (bus.status as StatusType);

  let cardBackgroundColor = "bg-white";

  switch (busStatus) {
    case "CANCELLED":
      cardBackgroundColor = "bg-red-50";
      break;
    case "PASSED":
      cardBackgroundColor = "bg-gray-100";
      break;
    default:
      cardBackgroundColor = "bg-white";
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalStops = stops.length;

  const disableAnimation = alreadyPassed || busStatus === "CANCELLED";

  useEffect(() => {
    if (disableAnimation) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalStops);
    }, 6000);

    return () => clearInterval(timer);
  }, [totalStops, disableAnimation]);

  const currentStop =
    stops && stops.length > 0 && currentIndex < stops.length
      ? stops[currentIndex]
      : null;

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-sm ${
        alreadyPassed || busStatus === "CANCELLED" ? "opacity-70" : ""
      } ${cardBackgroundColor}`}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          <StatusBadge status={busStatus} delayMinutes={bus.delayMinutes} />

          <div className="flex items-center gap-2">
            <StatusDate bus={bus} />
            <StatusTime bus={bus} />
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="mr-3">
            <BusIdentifier bus={bus} />
          </div>

          <div className="flex flex-col w-full text-left">
            <div className="mb-1">
              <span className="text-base font-bold text-gray-800 line-clamp-1">
                {terminusStop}
              </span>
            </div>

            {currentStop && (
              <div className="text-sm">
                <span
                  className={` rounded-md line-clamp-1 ${
                    alreadyPassed ? "text-blue-300" : "text-blue-500"
                  }`}
                >
                  {
                    <NumberFlow
                      willChange
                      digits={{ 1: { max: totalStops } }}
                      value={currentIndex + 1}
                    />
                  }
                  /{totalStops} : {currentStop.stop.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <StopsVisualizer
            stops={stops}
            currentIndex={currentIndex}
            alreadyPassed={alreadyPassed}
            busStatus={busStatus}
            onStopClick={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default BusCard;

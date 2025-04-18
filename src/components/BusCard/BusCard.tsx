import React, { useState, useEffect } from "react";
import { Bus, StatusType } from "../../types";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Stop } from "../../types";
import StatusTime from "../StatusTime/StatusTime";
import StatusDate from "../StatusDate/StatusDate";
import BusIdentifier from "../BusIdentifier/BusIdentifier";
import StopsVisualizer from "../StopsVisualizer/StopsVisualizer";
import NumberFlow from "@number-flow/react";
import { useTranslation } from "../../hooks/useTranslation";

interface BusCardProps {
  bus: Bus;
  stops: Stop[];
}

const BusCard = ({ bus, stops }: BusCardProps) => {
  const { t } = useTranslation();
  const terminusStop =
    stops && stops.length > 0
      ? stops[stops.length - 1].stop.name
      : t("bus.terminus");

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

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setCurrentIndex(index);
    }
  };

  return (
    <div
      role="article"
      aria-label={t("bus.card.label", { id: bus.id, terminus: terminusStop })}
      className={`rounded-lg overflow-hidden shadow-sm ${
        alreadyPassed || busStatus === "CANCELLED" ? "opacity-70" : ""
      } ${cardBackgroundColor}`}
      tabIndex={0}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div tabIndex={0} aria-label={t("bus.status.description." + busStatus.toLowerCase())}>
            <StatusBadge isTheoretical={bus.isTheoretical} status={busStatus} delayMinutes={bus.delayMinutes} />
          </div>

          <div
            className="flex items-center gap-2"
            role="group"
            aria-label={t("bus.times.label")}
            tabIndex={0}
          >
            <StatusDate bus={bus} />
            <StatusTime bus={bus} />
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="mr-3" tabIndex={0}>
            <BusIdentifier bus={bus} />
          </div>

          <div className="flex flex-col w-full text-left">
            <div className="mb-1">
              <span
                className="text-base font-bold text-gray-800 line-clamp-1"
                role="heading"
                aria-level={2}
                tabIndex={0}
              >
                {terminusStop}
              </span>
            </div>

            {currentStop && (
              <div className="text-sm">
                <span
                  className={`rounded-md line-clamp-1 ${
                    alreadyPassed ? "text-blue-300" : "text-blue-500"
                  }`}
                  role="status"
                  aria-live="polite"
                  aria-label={t("bus.currentStopInfo.label", {
                    current: currentIndex + 1,
                    total: totalStops,
                    stop: currentStop.stop.name,
                  })}
                  tabIndex={0}
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

        <div
          role="region"
          aria-label={t("bus.stops.label")}
          aria-describedby="stops-description"
          tabIndex={0}
        >
          <div id="stops-description" className="sr-only">
            {t("bus.stops.description", { total: totalStops })}
          </div>
          <StopsVisualizer
            stops={stops}
            currentIndex={currentIndex}
            alreadyPassed={alreadyPassed}
            busStatus={busStatus}
            onStopClick={setCurrentIndex}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default BusCard;

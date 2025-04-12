import React from "react";
import { Bus, StatusType } from "../../types";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Stop } from "../../types";
import StatusTime from "../StatusTime/StatusTime";
import StatusDate from "../StatusDate/StatusDate";
import BusIdentifier from "../BusIdentifier/BusIdentifier";

interface BusCardProps {
  bus: Bus;
  stops: Stop[];
}

const BusCard = ({ bus, stops }: BusCardProps) => {
  const departureStop =
    stops && stops.length > 0 ? stops[0].stop.name : "Inconnu";
  const terminusStop =
    stops && stops.length > 0 ? stops[stops.length - 1].stop.name : "Inconnu";

  const alreadyPassed = bus.delayedDateISO
    ? new Date(bus.delayedDateISO) < new Date()
    : bus.scheduledDateTime < new Date();

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm ${
        alreadyPassed ? "opacity-70" : ""
      }`}
      style={{
        backgroundColor: alreadyPassed ? "#F3F4F6" : "white",
      }}
    >
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <StatusBadge
            status={alreadyPassed ? "PASSED" : (bus.status as StatusType)}
            delayMinutes={bus.delayMinutes}
          />

          <StatusTime bus={bus} />
          <StatusDate bus={bus} />
        </div>

        <div className="flex items-center">
          <div className="mr-3">
            <BusIdentifier bus={bus} />
          </div>

          <div className="flex flex-col w-full text-left">
            <div className="mb-1">
              <span className="text-base font-bold text-gray-800 line-clamp-1">
                {terminusStop}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 truncate">
                Départ: {departureStop}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

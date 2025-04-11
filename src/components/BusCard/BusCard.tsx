import React from "react";
import { Bus } from "../../types";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Stop } from "../../types";
import StatusCompany from "../StatusCompay/StatusCompagny";
import StatusTime from "../StatusTime/StatusTime";
import StatusDate from "../StatusDate/StatusDate";

interface BusCardProps {
  bus: Bus;
  stops: Stop[];
}

const BusCard = ({ bus, stops }: BusCardProps) => {
  const departureStop =
    stops && stops.length > 0 ? stops[0].stop.name : "Inconnu";
  const terminusStop =
    stops && stops.length > 0 ? stops[stops.length - 1].stop.name : "Inconnu";

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md"
      style={{ borderLeft: `8px solid ${bus.companyColor}` }}
    >
      <div className="p-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-14 h-14 flex items-center justify-center rounded-full text-white font-bold"
              style={{ backgroundColor: bus.companyColor }}
            >
              {bus.lineCode}
            </div>

            <StatusTime bus={bus} />
          </div>
          <div className="flex items-center gap-2">
            <StatusDate bus={bus} />
            <StatusCompany company={bus.company} />
            <StatusBadge status={bus.status} delayMinutes={bus.delayMinutes} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {/* Ligne Départ */}
          <div className="flex items-start gap-2">
            <span className="text-base font-light" style={{ width: "110px" }}>
              Départ :
            </span>
            <span className="text-base truncate">{departureStop}</span>
          </div>

          {/* Ligne Terminus */}
          <div className="flex items-start gap-2">
            <span className="text-base font-light" style={{ width: "110px" }}>
              Terminus :
            </span>
            <span className="text-lg truncate font-bold text-gray-800">
              {terminusStop}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

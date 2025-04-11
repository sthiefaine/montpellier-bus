import React from "react";
import { Bus } from "../../types";
interface StatusTimeProps {
  bus: Bus;
}

const StatusTime = ({ bus }: StatusTimeProps) => {

  return (
    <div className="flex items-baseline">
      <div className="text-base font-light">Heure :</div>

      {bus.isDelayed && (
        <div className="flex items-baseline gap-1 ml-1">
          <div className="text-base line-through text-red-500">
            {bus.scheduledTime}
          </div>
          <div className="text-base font-bold text-red-600">
            {bus.delayedTime}
          </div>
        </div>
      )}
      {!bus.isDelayed && bus.deviation_seconds !== 0 && (
        <div className="flex items-baseline gap-1 ml-1">
          <div className="text-base line-through">{bus.scheduledTime}</div>
          <div className="text-lg font-bold">{bus.delayedTime}</div>
        </div>
      )}
      {!bus.isDelayed && bus.deviation_seconds === 0 && (
        <div className="text-lg font-bold ml-2 text-green-600">
          {bus.scheduledTime}
        </div>
      )}
    </div>
  );
};

export default StatusTime;

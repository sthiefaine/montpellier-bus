import React from "react";
import { Bus } from "../../types";
interface StatusTimeProps {
  bus: Bus;
}

const StatusTime = ({ bus }: StatusTimeProps) => {

  return (
    <div className="flex">
      <div className="text-base font-light mr-1">Heure :</div>

      {bus.isDelayed && (
        <div className="flex flex-row flex-wrap gap-1 ml-1">
          <div className="text-base line-through text-red-500">
            {bus.scheduledTime}
          </div>
          <div className="text-base font-bold text-red-600">
            {bus.delayedTime}
          </div>
        </div>
      )}
      {!bus.isDelayed && bus.deviation_seconds !== 0 && (
        <div className="flex flex-row flex-wrap gap-1 ml-1">
          <div className="text-base line-through">{bus.scheduledTime}</div>
          <div className="text-base font-bold text-green-600">{bus.delayedTime}</div>
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

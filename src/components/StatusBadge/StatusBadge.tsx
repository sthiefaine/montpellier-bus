import React from "react";
import { getStatusText } from "../../helpers/utils";

interface StatusBadgeProps {
  status: string;
  delayMinutes: number;
}

const StatusBadge = ({ status, delayMinutes }: StatusBadgeProps) => {
  return (
    <div
      className={`text-sm px-1 py-1 rounded-full ${
        status === "ON_TIME"
          ? "bg-green-100 text-green-800"
          : status === "LATE"
          ? "bg-red-100 text-red-800"
          : "bg-blue-100 text-blue-800"
      }`}
    >
      {getStatusText(status, delayMinutes)}
    </div>
  );
};

export default StatusBadge;

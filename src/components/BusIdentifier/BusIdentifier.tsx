import React from "react";
import { Bus } from "../../types";
import { COMPANY_COLORS } from "../../helpers/constants";

interface BusIdentifierProps {
  bus: Bus;
}

const BusIdentifier = ({ bus }: BusIdentifierProps) => {
  const { lineCode, company } = bus;
  return (
    <div className="relative flex items-center">
      <div
        className="
        w-[60px]
        flex items-center justify-center
      "
      >
        <span className="text-xl font-bold">{lineCode}</span>
      </div>

      {company !== "Autre compagnie" && (
        <div
          className="absolute -bottom-3 left-0 right-0 flex justify-center"
          style={{ color: "#fff" }}
        >
          <div
            className="px-1 rounded-full text-[10px] font-medium shadow-sm uppercase tracking-wider"
            style={{ backgroundColor: COMPANY_COLORS[company] }}
          >
            {company}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusIdentifier;

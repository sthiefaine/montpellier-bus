import React from "react";
import { COMPANY_COLORS } from "../../helpers/constants";

interface StatusCompanyProps {
  company: string;
}

const StatusCompany = ({ company }: StatusCompanyProps) => {
  return (
    <div
      className={`text-sm px-3 py-1 text-white rounded-full`}
      style={{ backgroundColor: COMPANY_COLORS[company] }}
    >
      {company}
    </div>
  );
};

export default StatusCompany;

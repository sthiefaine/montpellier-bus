import React from "react";
import { Company, ServerStatusEnum } from "../../types";
import ServerStatus from "../ServerStatus/ServerStatus";

interface CompanyFilterProps {
  companies: Company[];
  selectedCompany: string;
  onSelectCompany: (companyId: string) => void;
  serverStatus: ServerStatusEnum;
  isRefreshing: boolean;
}

const CompanyFilter= ({
  companies,
  selectedCompany,
  onSelectCompany,
  serverStatus,
  isRefreshing,
}: CompanyFilterProps) => {
  return (
    <div className="fixed top-18 left-0 right-0 z-10 w-full bg-white shadow-md">
      <div className="w-full mx-auto py-2 px-2 flex gap-4">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              style={{
                backgroundColor:
                  selectedCompany === company.id ? company.color : "white",
                borderColor: company.color,
              }}
              className={`py-1 px-2 rounded-full border-2 font-medium text-sm transition-colors duration-200 flex-shrink-0
                ${
                  selectedCompany === company.id
                    ? "text-white"
                    : "text-gray-700"
                }`}
            >
              {company.name}
            </button>
          ))}
        </div>
        <ServerStatus isRefreshing={isRefreshing} className="ml-4" serverStatus={serverStatus} />
      </div>
    </div>
  );
};

export default CompanyFilter;

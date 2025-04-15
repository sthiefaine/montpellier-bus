import React from "react";
import { Company } from "../../types";

interface CompanyFilterProps {
  companies: Company[];
  selectedCompany: string;
  onSelectCompany: (companyId: string) => void;
}

const CompanyFilter = ({
  companies,
  selectedCompany,
  onSelectCompany,
}: CompanyFilterProps) => {
  return (
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
  );
};

export default CompanyFilter;

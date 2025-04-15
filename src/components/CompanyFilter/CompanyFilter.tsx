import React from "react";
import { Company } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";

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
  const { t } = useTranslation();

  return (
    <div 
      role="radiogroup" 
      aria-label={t("company.filter.label")}
      className="flex gap-1 overflow-x-auto no-scrollbar"
    >
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => onSelectCompany(company.id)}
          role="radio"
          aria-checked={selectedCompany === company.id}
          aria-label={t("company.filter.button", { company: t(`company.${company.id.toLowerCase()}`) })}
          style={{
            minWidth: "65px",
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
          {t(`company.${company.id.toLowerCase()}`)}
        </button>
      ))}
    </div>
  );
};

export default CompanyFilter;

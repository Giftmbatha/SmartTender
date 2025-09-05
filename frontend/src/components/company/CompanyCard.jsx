import React from "react";

const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

// Enhanced CompanyCard component
const CompanyCard = ({ company, onEdit, onDelete, colors }) =>{
  return (
    <div className="overflow-hidden transition-all duration-300 shadow-md rounded-2xl hover:shadow-lg" style={{ backgroundColor: colors.primaryBg, border: `1px solid ${colors.secondaryBg}30` }}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="mb-1 text-xl font-bold" style={{ color: colors.primaryText }}>{company.name}</h3>
            <p className="mb-2 text-sm" style={{ color: colors.secondaryBg }}>{company.industry}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="p-2 transition-colors rounded-full hover:bg-opacity-10"
              style={{ color: colors.secondaryBg, backgroundColor: `${colors.secondaryBg}15` }}
            >
              <Edit3 size={16} />
            </button>
            <button 
              onClick={() => onDelete(company.id)}
              className="p-2 transition-colors rounded-full hover:bg-opacity-10"
              style={{ color: '#e53e3e', backgroundColor: `${colors.secondaryBg}15` }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm" style={{ color: colors.primaryText }}>{company.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
            <span className="text-sm" style={{ color: colors.primaryText }}>{company.size}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" style={{ color: colors.secondaryBg }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm" style={{ color: colors.primaryText }}>{company.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
            <span className="text-sm" style={{ color: colors.primaryText }}>Est. {company.founded}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" style={{ color: colors.secondaryBg }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" x2="21" y1="14" y2="3"></line>
            </svg>
            <span className="text-sm" style={{ color: colors.primaryText }}>{company.website}</span>
          </div>
        </div>

        {company.specialties && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold" style={{ color: colors.primaryText }}>Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {company.specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ backgroundColor: `${colors.secondaryBg}20`, color: colors.secondaryBg }}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {company.certifications && company.certifications.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold" style={{ color: colors.primaryText }}>Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {company.certifications.map((cert, index) => (
                <span 
                  key={index} 
                  className="flex items-center px-3 py-1 text-xs rounded-full"
                  style={{ backgroundColor: `${colors.secondaryBg}15`, color: colors.secondaryBg }}
                >
                  <Award size={12} className="mr-1" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CompanyCard;

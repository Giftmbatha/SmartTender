import React from "react";
import { Edit3, Trash2, Users, MapPin, Calendar, Award, Building2, Globe, Phone, Mail } from "lucide-react";

// Define the color palette from the home page
const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

const CompanyCard = ({ company, onEdit, onDelete, colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
} }) => {
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
          {company.size && (
            <div className="flex items-center">
              <Users size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>{company.size}</span>
            </div>
          )}
          
          {company.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>{company.location}</span>
            </div>
          )}
          
          {company.founded && (
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>Est. {company.founded}</span>
            </div>
          )}
          
          {company.website && (
            <div className="flex items-center">
              <Globe size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>{company.website}</span>
            </div>
          )}
          
          {company.email && (
            <div className="flex items-center">
              <Mail size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>{company.email}</span>
            </div>
          )}
          
          {company.phone && (
            <div className="flex items-center">
              <Phone size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
              <span className="text-sm" style={{ color: colors.primaryText }}>{company.phone}</span>
            </div>
          )}
        </div>

        {company.specialties && company.specialties.length > 0 && (
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
};

export default CompanyCard;
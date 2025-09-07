import React, { useState, useEffect } from "react";
import { Building2, MapPin, Mail, Phone, Globe, Hash, ArrowLeft, Save } from "lucide-react";

// Define the color palette from the home page
const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

const CompanyForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    industry: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    size: "",
    founded: "",
    description: "",
    specialties: "",
    certifications: "",
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.registration_number.trim()) newErrors.registration_number = 'Registration number is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process specialties and certifications from comma-separated strings to arrays
      const processedData = {
        ...formData,
        specialties: formData.specialties ? formData.specialties.split(',').map(s => s.trim()).filter(s => s) : [],
        certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()).filter(c => c) : []
      };
      
      onSubmit(processedData);
    }
  };

  const industries = [
    "Construction",
    "Technology",
    "Education",
    "Healthcare",
    "Manufacturing",
    "Retail",
    "Hospitality",
    "Transportation",
    "Energy",
    "Finance",
    "Real Estate",
    "Agriculture",
    "Other"
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  return (
    <div className="p-6 shadow-lg rounded-2xl" style={{ backgroundColor: colors.primaryBg, border: `2px solid ${colors.secondaryBg}` }}>
      <div className="flex items-center mb-6">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-full hover:bg-opacity-10"
          style={{ color: colors.secondaryBg, backgroundColor: `${colors.secondaryBg}15` }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h2 className="flex-1 text-xl font-bold text-center" style={{ color: colors.primaryText }}>
          {initialData.id ? 'Edit Company Profile' : 'Create Company Profile'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Company Name */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Company Name *
            </label>
            <div className="relative">
              <Building2 className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : ''}`}
                style={{ 
                  borderColor: errors.name ? '#e53e3e' : colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
                required
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Registration Number *
            </label>
            <div className="relative">
              <Hash className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                placeholder="Enter registration number"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.registration_number ? 'border-red-500' : ''}`}
                style={{ 
                  borderColor: errors.registration_number ? '#e53e3e' : colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
                required
              />
            </div>
            {errors.registration_number && <p className="mt-1 text-sm text-red-500">{errors.registration_number}</p>}
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Industry *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.industry ? 'border-red-500' : ''}`}
              style={{ 
                borderColor: errors.industry ? '#e53e3e' : colors.secondaryBg,
                color: colors.primaryText,
                backgroundColor: 'transparent'
              }}
              required
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
          </div>


          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location (City, State)"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.location ? 'border-red-500' : ''}`}
                style={{ 
                  borderColor: errors.location ? '#e53e3e' : colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
                required
              />
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : ''}`}
                style={{ 
                  borderColor: errors.email ? '#e53e3e' : colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
                required
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : ''}`}
                style={{ 
                  borderColor: errors.phone ? '#e53e3e' : colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
                required
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Website */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.primaryText }}>
              Website
            </label>
            <div className="relative">
              <Globe className="absolute transform -translate-y-1/2 left-3 top-1/2" size={18} style={{ color: colors.secondaryBg }} />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                style={{ 
                  borderColor: colors.secondaryBg,
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </div>
        </div>


        <div className="flex justify-end gap-4 pt-6 border-t" style={{ borderColor: `${colors.secondaryBg}30` }}>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 font-medium transition-colors border rounded-lg"
            style={{ 
              borderColor: colors.secondaryBg,
              color: colors.secondaryBg,
              backgroundColor: 'transparent'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-transform rounded-lg hover:scale-105"
            style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
          >
            <Save size={18} />
            {initialData.id ? 'Update Company' : 'Create Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
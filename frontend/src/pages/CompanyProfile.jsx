import React, { useState, useEffect } from "react";
import CompanyForm from "../components/company/CompanyForm";
import CompanyCard from "../components/company/CompanyCard";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../services/companyService";
import { Building2, Plus, Edit3, Trash2, Star, Award, Users, Calendar, ArrowRight, Sparkles } from "lucide-react";

// Define the color palette from the home page
const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

const CompanyProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [editing, setEditing] = useState(null); // null = no form open
  const [plan, setPlan] = useState("Free"); // TODO: Fetch from backend user profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        console.log("No companies found");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleCreate = async (formData) => {
    const newCompany = await createCompany(formData);
    setCompanies([...companies, newCompany]);
    setEditing(null);
  };

  const handleUpdate = async (formData) => {
    const updated = await updateCompany(editing.id, formData);
    setCompanies(companies.map(c => (c.id === editing.id ? updated : c)));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company profile?")) {
      await deleteCompany(id);
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  // Sample company data for demonstration
  const sampleCompany = {
    id: 1,
    name: "GreenBuild Construction",
    industry: "Construction & Engineering",
    description: "Specializing in sustainable building practices and eco-friendly construction solutions.",
    size: "50-100 employees",
    location: "Portland, OR",
    website: "www.greenbuild.com",
    founded: "2015",
    specialties: ["Green Building", "LEED Certification", "Commercial Construction"],
    certifications: ["LEED Platinum", "ISO 9001", "B Corp Certified"]
  };

  // For demonstration purposes, add sample company if none exist
  useEffect(() => {
    if (companies.length === 0 && !loading) {
      setCompanies([sampleCompany]);
    }
  }, [companies, loading]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.primaryBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: colors.primaryText }}>Company Profiles</h1>
          <p className="text-lg" style={{ color: colors.secondaryBg }}>Manage your business profiles for tender applications</p>
        </div>

        {/* Stats and Upgrade Banner for Free Plan */}
        {plan === "Free" && (
          <div className="p-6 mb-8 shadow-md rounded-2xl" style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div>
                <h3 className="mb-2 text-xl font-semibold">Free Plan Limitations</h3>
                <p className="opacity-90">You can create up to 1 company profile. Upgrade to add more.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 mt-4 font-medium transition-transform rounded-full md:mt-0 hover:scale-105" style={{ backgroundColor: colors.primaryText }}>
                Upgrade Plan <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company List */}
          <div className="lg:col-span-2">
            {/* Add Company Button */}
            {plan === "Free" && companies.length >= 1 ? (
              <div className="p-6 mb-6 text-center rounded-2xl" style={{ backgroundColor: `${colors.secondaryBg}15` }}>
                <Sparkles className="mx-auto mb-3" style={{ color: colors.secondaryBg }} />
                <h3 className="mb-2 font-semibold" style={{ color: colors.primaryText }}>Upgrade to Add More Companies</h3>
                <p className="text-sm" style={{ color: colors.secondaryBg }}>
                  You've reached the limit for the Free Plan. Upgrade to create additional company profiles.
                </p>
              </div>
            ) : (
              !editing && (
                <button
                  onClick={() => setEditing({})}
                  className="w-full p-6 mb-6 text-center transition-all border-2 border-dashed rounded-2xl hover:shadow-md"
                  style={{ 
                    borderColor: colors.secondaryBg, 
                    color: colors.secondaryBg,
                    backgroundColor: `${colors.secondaryBg}08`
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Plus size={32} className="mb-2" />
                    <span className="font-medium">Add Company Profile</span>
                  </div>
                </button>
              )
            )}

            {/* Form for Create/Edit */}
            {editing && (
              <div className="mb-8">
                <CompanyForm
                  onSubmit={editing.id ? handleUpdate : handleCreate}
                  initialData={editing}
                  onCancel={() => setEditing(null)}
                  colors={colors}
                />
              </div>
            )}

            {/* List Companies */}
            {loading ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 mx-auto border-b-2 rounded-full animate-spin" style={{ borderColor: colors.secondaryBg }}></div>
                <p className="mt-4" style={{ color: colors.secondaryBg }}>Loading companies...</p>
              </div>
            ) : companies.length === 0 && !editing ? (
              <div className="p-8 text-center rounded-2xl" style={{ backgroundColor: `${colors.secondaryBg}10` }}>
                <Building2 size={48} className="mx-auto mb-4 opacity-60" style={{ color: colors.secondaryBg }} />
                <h3 className="mb-2 text-xl font-medium" style={{ color: colors.primaryText }}>No company profiles yet</h3>
                <p style={{ color: colors.secondaryBg }}>Create your first company profile to get started with tender applications.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {companies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onEdit={() => setEditing(company)}
                    onDelete={handleDelete}
                    colors={colors}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Help & Tips */}
          <div>
            <div className="sticky space-y-6 top-6">
              <div className="p-6 shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, border: `1px solid ${colors.secondaryBg}30` }}>
                <h3 className="flex items-center gap-2 mb-4 font-semibold" style={{ color: colors.primaryText }}>
                  <Award size={20} style={{ color: colors.secondaryBg }} />
                  Why Create Company Profiles?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${colors.secondaryBg}20` }}>
                      <span className="text-xs font-bold" style={{ color: colors.secondaryBg }}>1</span>
                    </div>
                    <span className="text-sm" style={{ color: colors.primaryText }}>Streamline tender applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${colors.secondaryBg}20` }}>
                      <span className="text-xs font-bold" style={{ color: colors.secondaryBg }}>2</span>
                    </div>
                    <span className="text-sm" style={{ color: colors.primaryText }}>Showcase your company's strengths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${colors.secondaryBg}20` }}>
                      <span className="text-xs font-bold" style={{ color: colors.secondaryBg }}>3</span>
                    </div>
                    <span className="text-sm" style={{ color: colors.primaryText }}>Save time on repetitive form filling</span>
                  </li>
                </ul>
              </div>

              {plan === "Free" && (
                <div className="p-6 text-center rounded-2xl" style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
                  <h3 className="mb-2 font-semibold">Ready for more?</h3>
                  <p className="mb-4 text-sm opacity-90">Upgrade to create multiple company profiles and access premium features.</p>
                  <button className="px-4 py-2 text-sm font-medium rounded-full" style={{ backgroundColor: colors.primaryText }}>
                    View Plans
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyProfile;

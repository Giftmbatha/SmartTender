import { useState, useEffect } from "react";
import { searchTenders } from "../services/tenderServices";
import { Search, Filter, Loader, MapPin, Calendar, DollarSign, Building2, User, Navigation } from "lucide-react";

// Define the color palette from the home page
const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

export default function SearchTenders() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    minValue: "",
    maxValue: "",
    deadline: "",
    province: "",
    buyer: "",
    submission_deadline: "",
    budget_min: "",
    budget_max: ""
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tenderResults = Array.isArray(results) ? results : [];

  // Function to perform the search
  const performSearch = async (currentFilters) => {
    setLoading(true);
    try {
      const data = await searchTenders(currentFilters);
      setResults(Array.isArray(data) ? data : []);
      // NOTE: You should get the total pages from your API response
      // For now, we'll set it to a placeholder value
      setTotalPages(2); 
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    performSearch(filters);
  }, []);

  const handleSearch = () => {
    // This will use the current state of `filters`
    performSearch(filters);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  const clearFilters = () => {
    const emptyFilters = {
      keyword: "",
      location: "",
      category: "",
      minValue: "",
      maxValue: "",
      deadline: "",
      province: "",
      buyer: "",
      submission_deadline: "",
      budget_min: "",
      budget_max: ""
    };
    setFilters(emptyFilters);
    // Refetch data with no filters
    performSearch(emptyFilters);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.primaryBg }}>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: colors.primaryText }}>Find Tenders</h1>
        <p className="mb-8 text-lg" style={{ color: colors.secondaryBg }}>Discover opportunities that match your business profile</p>
        
        {/* Search Header */}
        <div className="p-6 mb-8 shadow-md rounded-2xl" style={{ backgroundColor: colors.secondaryBg }}>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute transform -translate-y-1/2 left-3 top-1/2" style={{ color: colors.primaryText }} size={20} />
              <input
                type="text"
                placeholder="Search by keyword, category, or organization..."
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="w-full py-3 pl-10 pr-4 border-0 rounded-full focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: colors.primaryBg, 
                  color: colors.primaryText,
                  focusRingColor: colors.primaryText
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-3 font-medium transition-transform rounded-full hover:scale-105"
              style={{ backgroundColor: colors.primaryText, color: colors.lightText }}
            >
              <Search size={18} />
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 font-medium border rounded-full"
              style={{ 
                borderColor: colors.primaryText, 
                color: colors.primaryText,
                backgroundColor: 'transparent'
              }}
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-6 mt-6 rounded-2xl" style={{ backgroundColor: colors.primaryBg }}>
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                  <Navigation className="absolute transform -translate-y-1/2 left-3 top-1/2" style={{ color: colors.secondaryBg }} size={18} />
                  <input
                    type="text"
                    name="province"
                    value={filters.province || ""}
                    onChange={handleChange}
                    placeholder="Province"
                    className="w-full py-2 pl-10 pr-4 border rounded-lg"
                    style={{ 
                      borderColor: colors.secondaryBg, 
                      color: colors.primaryText,
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>

                <div className="relative">
                  <User className="absolute transform -translate-y-1/2 left-3 top-1/2" style={{ color: colors.secondaryBg }} size={18} />
                  <input
                    type="text"
                    name="buyer"
                    value={filters.buyer || ""}
                    onChange={handleChange}
                    placeholder="Buyer/Organization"
                    className="w-full py-2 pl-10 pr-4 border rounded-lg"
                    style={{ 
                      borderColor: colors.secondaryBg, 
                      color: colors.primaryText,
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute transform -translate-y-1/2 left-3 top-1/2" style={{ color: colors.secondaryBg }} size={18} />
                  <input
                    type="date"
                    name="submission_deadline"
                    value={filters.submission_deadline || ""}
                    onChange={handleChange}
                    placeholder="Submission Deadline"
                    className="w-full py-2 pl-10 pr-4 border rounded-lg"
                    style={{ 
                      borderColor: colors.secondaryBg, 
                      color: colors.primaryText,
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute transform -translate-y-1/2 left-2 top-1/2" style={{ color: colors.secondaryBg }} size={16} />
                    <input
                      type="number"
                      name="budget_min"
                      value={filters.budget_min || ""}
                      onChange={handleChange}
                      placeholder="Min Budget"
                      className="w-full py-2 pr-2 border rounded-lg pl-7"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                  <div className="relative flex-1">
                    <DollarSign className="absolute transform -translate-y-1/2 left-2 top-1/2" style={{ color: colors.secondaryBg }} size={16} />
                    <input
                      type="number"
                      name="budget_max"
                      value={filters.budget_max || ""}
                      onChange={handleChange}
                      placeholder="Max Budget"
                      className="w-full py-2 pr-2 border rounded-lg pl-7"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                </div>
              </div>

              
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 font-medium border rounded-lg"
                  style={{ 
                    borderColor: colors.secondaryBg, 
                    color: colors.secondaryBg,
                    backgroundColor: 'transparent'
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 font-medium rounded-lg"
                  style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin" style={{ color: colors.secondaryBg }} size={40} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg" style={{ color: colors.primaryText }}>
                Showing <span className="font-bold">{tenderResults.length}</span> results
                {filters.keyword && <> for "<span className="font-bold">{filters.keyword}</span>"</>}
              </p>
              
              <select 
                className="px-4 py-2 border rounded-lg"
                style={{ 
                  borderColor: colors.secondaryBg, 
                  color: colors.primaryText,
                  backgroundColor: 'transparent'
                }}
              >
                <option>Sort by: Newest</option>
                <option>Sort by: Deadline</option>
                <option>Sort by: Value</option>
                <option>Sort by: Relevance</option>
              </select>
            </div>

            {tenderResults.length === 0 ? (
              <div className="py-16 text-center rounded-2xl" style={{ backgroundColor: colors.primaryBg }}>
                <Search size={48} className="mx-auto mb-4 opacity-50" style={{ color: colors.secondaryBg }} />
                <h3 className="mb-2 text-xl font-medium" style={{ color: colors.primaryText }}>No tenders found</h3>
                <p style={{ color: colors.secondaryBg }}>Try adjusting your search criteria or browse all available tenders.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {tenderResults.map(tender => (
                  <div key={tender.id} className="overflow-hidden transition-all duration-300 shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: colors.primaryBg, border: `1px solid ${colors.secondaryBg}30` }}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: `${colors.secondaryBg}20`, color: colors.secondaryBg }}>
                          {tender.category}
                        </span>
                        <button className="p-1 rounded-full hover:bg-opacity-10" style={{ color: colors.secondaryBg, backgroundColor: `${colors.secondaryBg}15` }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <h3 className="mb-2 text-lg font-bold" style={{ color: colors.primaryText }}>{tender.title}</h3>
                      <p className="mb-4 text-sm line-clamp-2" style={{ color: colors.secondaryBg }}>{tender.description}</p>
                      
                      <div className="flex items-center mb-3">
                        <Building2 size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm" style={{ color: colors.primaryText }}>{tender.organization}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <User size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm" style={{ color: colors.primaryText }}>{tender.buyer}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <MapPin size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm" style={{ color: colors.primaryText }}>{tender.location}, {tender.province}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                          <span className="text-sm font-medium" style={{ color: colors.primaryText }}>{tender.value}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                          <span className="text-sm" style={{ color: colors.primaryText }}>{new Date(tender.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button className="w-full py-2 font-medium text-center transition-colors rounded-lg" style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
              colors={colors}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Pagination component
function Pagination({ currentPage, totalPages, onPageChange, colors }) {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50"
        style={{ 
          backgroundColor: currentPage === 1 ? 'transparent' : `${colors.secondaryBg}20`,
          color: colors.primaryText,
          border: `1px solid ${colors.secondaryBg}30`
        }}
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${currentPage === page ? 'font-bold' : ''}`}
          style={{ 
            backgroundColor: currentPage === page ? colors.secondaryBg : 'transparent',
            color: currentPage === page ? colors.lightText : colors.primaryText,
            border: `1px solid ${colors.secondaryBg}30`
          }}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50"
        style={{ 
          backgroundColor: currentPage === totalPages ? 'transparent' : `${colors.secondaryBg}20`,
          color: colors.primaryText,
          border: `1px solid ${colors.secondaryBg}30`
        }}
      >
        Next
      </button>
    </div>
  );
}
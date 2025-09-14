import { useState, useEffect } from "react";
import { searchTenders } from "../services/tenderServices";
import { Search, Filter, Loader, MapPin, Calendar, DollarSign, Building2, User, Navigation, FileText, Sparkles, Bug, XCircle, ChevronDown, ChevronUp, X } from "lucide-react";

// Define the color palette from the home page
const colors = {
  primaryBg: '#FAF7F3',
  primaryText: '#2D4F2B',
  secondaryBg: '#708A58',
  lightText: '#FAF7F3',
  darkText: '#2D4F2B',
};

// Format currency to South African Rand
const formatZAR = (amount) => {
  if (typeof amount === 'string' && amount.includes('R')) return amount;
  if (typeof amount === 'number') {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  return amount || "N/A";
};

// Enhanced Pagination component
function Pagination({ currentPage, totalPages, onPageChange, colors }) {
  const pagesToShow = [];
  const maxPages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = Math.min(totalPages, startPage + maxPages - 1);

  if (endPage - startPage + 1 < maxPages) {
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 transition-colors duration-200 rounded-lg disabled:opacity-50"
        style={{ 
          backgroundColor: currentPage === 1 ? 'transparent' : `${colors.secondaryBg}20`,
          color: colors.primaryText,
          border: `1px solid ${colors.secondaryBg}30`
        }}
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-lg`}
            style={{ 
              backgroundColor: 'transparent',
              color: colors.primaryText,
              border: `1px solid ${colors.secondaryBg}30`
            }}
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pagesToShow.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg transition-colors duration-200 ${currentPage === page ? 'font-bold' : ''}`}
          style={{ 
            backgroundColor: currentPage === page ? colors.secondaryBg : 'transparent',
            color: currentPage === page ? colors.lightText : colors.primaryText,
            border: `1px solid ${colors.secondaryBg}30`
          }}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-lg`}
            style={{ 
              backgroundColor: 'transparent',
              color: colors.primaryText,
              border: `1px solid ${colors.secondaryBg}30`
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 transition-colors duration-200 rounded-lg disabled:opacity-50"
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

// Summary Modal Component
function SummaryModal({ isOpen, onClose, summary }) {
  if (!isOpen || !summary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl p-6 shadow-lg rounded-xl" style={{ backgroundColor: colors.lightText }}>
        <button onClick={onClose} className="absolute p-2 rounded-full top-4 right-4" style={{ color: colors.primaryText }}>
          <X size={24} />
        </button>
        <h2 className="mb-4 text-2xl font-bold" style={{ color: colors.primaryText }}>Document Summary</h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow-sm" style={{ backgroundColor: colors.primaryBg, border: `1px solid ${colors.secondaryBg}30` }}>
            <h3 className="mb-2 text-lg font-semibold" style={{ color: colors.primaryText }}>Overview</h3>
            <p className="text-sm" style={{ color: colors.primaryText }}>{summary.summary}</p>
          </div>
          <div className="p-4 rounded-lg shadow-sm" style={{ backgroundColor: colors.primaryBg, border: `1px solid ${colors.secondaryBg}30` }}>
            <h3 className="mb-2 text-lg font-semibold" style={{ color: colors.primaryText }}>Key Details</h3>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2" style={{ color: colors.primaryText }}>
              <div>
                <strong>Key Deadlines:</strong> <p>{summary.key_deadlines}</p>
              </div>
              <div>
                <strong>Budget Highlights:</strong> <p>{summary.budget_highlights}</p>
              </div>
              <div>
                <strong>Buyer Details:</strong> <p>{summary.buyer_details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchTenders() {
  const [filters, setFilters] = useState({
    q: "",
    buyer: "",
    dateFrom: "",
    province: "",
    minValue: "",
    maxValue: "",
    dateTo: "",
    page: 1,
    limit: 60
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [summarizing, setSummarizing] = useState({});
  const [apiStatus, setApiStatus] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [rawApiResponse, setRawApiResponse] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(null);

  const tenderResults = Array.isArray(results) ? results : [];

  // Function to perform the search
  const performSearch = async (currentFilters) => {
    setLoading(true);
    setApiStatus("");
    setDebugInfo("");
    setRawApiResponse(null);
    setResults([]);

    try {
      const apiFilters = {
        q: currentFilters.q || undefined,
        buyer: currentFilters.buyer || undefined,
        province: currentFilters.province || undefined,
        dateFrom: currentFilters.dateFrom || undefined,
        dateTo: currentFilters.dateTo || undefined,
        minValue: currentFilters.minValue || undefined,
        maxValue: currentFilters.maxValue || undefined,
        page: currentFilters.page || 1,
        limit: currentFilters.limit || 60,
        budget_min: currentFilters.budget_min || undefined,
        budget_max: currentFilters.budget_max || undefined,
      };

      Object.keys(apiFilters).forEach((key) => {
        if (!apiFilters[key]) delete apiFilters[key];
      });

      console.log("Sending filters to API:", apiFilters);

      const data = await searchTenders(apiFilters);

      console.log("Raw API response:", data);
      setRawApiResponse(data);

      const resultsArray = data?.results || [];

      if (resultsArray.length > 0) {
        setApiStatus("using_ocds_data");
        setDebugInfo(`Found ${resultsArray.length} tenders from OCDS API`);
      } else {
        setApiStatus("no_data");
        setDebugInfo("API returned empty results");
      }

      setResults(resultsArray);
      setTotalPages(Math.ceil((data?.count || 0) / 60) || 1);
    } catch (err) {
      console.error("Search failed:", err);
      setApiStatus("api_error");
      setDebugInfo(`Error: ${err.message}`);
      setResults(getSampleData());
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };


  // Function to summarize a tender
  const summarizeTender = async (tenderId) => {
    setSummarizing(prev => ({ ...prev, [tenderId]: true }));
    
    try {
      setTimeout(() => {
        const tender = results.find(t => t.id === tenderId);
        const summaryData = {
          summary: `This tender involves ${tender?.title} with a budget of approximately ${tender?.value}. The tender focuses on ${tender?.category || 'general procurement'}.`,
          key_deadlines: formatDate(tender?.deadline || tender?.submission_deadline),
          budget_highlights: formatZAR(tender?.budget || 'N/A'),
          buyer_details: tender?.buyer || tender?.organization || 'Not specified',
        };
        
        setCurrentSummary(summaryData);
        setIsModalOpen(true);
        
        setSummarizing(prev => ({ ...prev, [tenderId]: false }));
      }, 1000);
    } catch (error) {
      console.error("Summarization failed:", error);
      setSummarizing(prev => ({ ...prev, [tenderId]: false }));
    }
  };

  // Get sample data for fallback
  const getSampleData = () => {
    return [
      {
        id: 1,
        title: "School Feeding Scheme",
        description: "Implementation of National School Nutrition Programme for primary schools in Eastern Cape province.",
        value: "R2,500,000",
        deadline: "2023-12-15",
        location: "East London, Eastern Cape",
        province: "Eastern Cape",
        category: "Nutrition",
        organization: "Eastern Cape Department of Education",
        buyer: "EC Education Nutrition Division",
        submission_deadline: "2023-12-10",
        budget: 2500000
      },
      {
        id: 2,
        title: "Food Security Program",
        description: "Community food security initiative for vulnerable households in rural Eastern Cape.",
        value: "R1,800,000",
        deadline: "2023-11-30",
        location: "Port Elizabeth, Eastern Cape",
        province: "Eastern Cape",
        category: "Social Development",
        organization: "Eastern Cape Department of Social Development",
        buyer: "EC Social Development Food Security",
        submission_deadline: "2023-11-25",
        budget: 1800000
      }
    ];
  };

  // Initial data fetch on component mount
  useEffect(() => {
    performSearch(filters);
  }, []);

  const handleSearch = () => {
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
    q: "",
    buyer: "",
    province: "",
    dateFrom: "",
    dateTo: "",
    minValue: "",
    maxValue: "",
    budget_min: "",
    budget_max: "",
    page: 1,
    limit: 60,
  };
  setFilters(emptyFilters);
  performSearch(emptyFilters);
};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.primaryBg }}>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: colors.primaryText }}>Find Tenders</h1>
        <p className="mb-8 text-lg" style={{ color: colors.secondaryBg }}>Discover opportunities that match your business profile</p>
        
        {/* API Status & Debug Info */}
        <div className="mb-6 space-y-4">
          {debugInfo && (
            <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#EFF6FF', border: '1px solid #3B82F6' }}>
              <Bug size={16} style={{ color: '#1E40AF' }} />
              <span className="text-sm" style={{ color: '#1E40AF' }}>{debugInfo}</span>
            </div>
          )}
          
          {apiStatus === "api_error" && (
            <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #EF4444' }}>
              <XCircle size={16} style={{ color: '#B91C1C' }} />
              <span className="text-sm" style={{ color: '#B91C1C' }}>
                Unable to connect to the tender database. Showing sample data instead.
              </span>
            </div>
          )}

          {apiStatus === "no_data" && (
            <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#F0FDF4', border: '1px solid #22C55E' }}>
              <Sparkles size={16} style={{ color: '#166534' }} />
              <span className="text-sm" style={{ color: '#166534' }}>
                API connection successful but no tenders found for your search criteria.
              </span>
            </div>
          )}
        </div>
        
        {/* Raw API Response Debug (collapsible) */}
        {rawApiResponse && (
          <details className="p-4 mb-6 rounded-lg" style={{ backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB' }}>
            <summary className="font-medium cursor-pointer" style={{ color: colors.primaryText }}>
              Debug: View Raw API Response
            </summary>
            <pre className="p-2 mt-2 overflow-auto text-xs text-green-400 bg-gray-800 rounded">
              {JSON.stringify(rawApiResponse, null, 2)}
            </pre>
          </details>
        )}
        
        {/* Search & Filters Card */}
        <div className="p-6 mb-8 shadow-lg rounded-xl" style={{ backgroundColor: colors.secondaryBg }}>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute transform -translate-y-1/2 left-4 top-1/2" style={{ color: colors.primaryText }} size={20} />
              <input
                type="text"
                placeholder="Search by keyword, category, or organization..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-sm border-0 rounded-full focus:ring-2 focus:ring-opacity-50"
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
              Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-6 mt-6 rounded-xl" style={{ backgroundColor: colors.primaryBg }}>
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative">
                  <Navigation className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    type="text"
                    name="province"
                    value={filters.province || ""}
                    onChange={handleChange}
                    placeholder="Province"
                    className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: colors.secondaryBg, 
                      color: colors.primaryText,
                      backgroundColor: 'transparent',
                      focusRingColor: colors.secondaryBg
                    }}
                  />
                </div>
                <div className="relative">
                  <User className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    type="text"
                    name="buyer"
                    value={filters.buyer || ""}
                    onChange={handleChange}
                    placeholder="Buyer/Organization"
                    className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: colors.secondaryBg, 
                      color: colors.primaryText,
                      backgroundColor: 'transparent',
                      focusRingColor: colors.secondaryBg
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                    <input
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleChange}
                      placeholder="Start Date"
                      className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent',
                        focusRingColor: colors.secondaryBg
                      }}
                    />
                  </div>
                  <div className="relative flex-1">
                    <Calendar className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                    <input
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleChange}
                      placeholder="Submission Deadline"
                      className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent',
                        focusRingColor: colors.secondaryBg
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 lg:col-span-3">
                  <div className="relative flex-1">
                    <DollarSign className="absolute text-gray-400 transform -translate-y-1/2 left-2 top-1/2" size={16} />
                    <input
                      type="number"
                      name="budget_min"
                      value={filters.budget_min || ""}
                      onChange={handleChange}
                      placeholder="Min Budget (ZAR)"
                      className="w-full py-2 pr-2 text-sm border rounded-lg pl-7 focus:ring-2 focus:ring-opacity-50"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent',
                        focusRingColor: colors.secondaryBg
                      }}
                    />
                  </div>
                  <div className="relative flex-1">
                    <DollarSign className="absolute text-gray-400 transform -translate-y-1/2 left-2 top-1/2" size={16} />
                    <input
                      type="number"
                      name="budget_max"
                      value={filters.budget_max || ""}
                      onChange={handleChange}
                      placeholder="Max Budget (ZAR)"
                      className="w-full py-2 pr-2 text-sm border rounded-lg pl-7 focus:ring-2 focus:ring-opacity-50"
                      style={{ 
                        borderColor: colors.secondaryBg, 
                        color: colors.primaryText,
                        backgroundColor: 'transparent',
                        focusRingColor: colors.secondaryBg
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
            <span className="ml-3" style={{ color: colors.primaryText }}>Searching tenders...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
              <p className="mb-2 text-lg md:mb-0" style={{ color: colors.primaryText }}>
                Showing <span className="font-bold">{tenderResults.length}</span> results
                {filters.keyword && <> for "<span className="font-bold">{filters.keyword}</span>"</>}
              </p>
              
              <select 
                className="px-4 py-2 text-sm border rounded-lg"
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
              <div className="py-16 text-center rounded-2xl" style={{ backgroundColor: colors.lightText }}>
                <Search size={48} className="mx-auto mb-4 opacity-50" style={{ color: colors.secondaryBg }} />
                <h3 className="mb-2 text-xl font-medium" style={{ color: colors.primaryText }}>No tenders found</h3>
                <p style={{ color: colors.secondaryBg }}>Try adjusting your search criteria or browse all available tenders.</p>
                <button 
                  onClick={() => performSearch({})}
                  className="px-4 py-2 mt-4 font-medium rounded-lg"
                  style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
                >
                  Show All Tenders
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {tenderResults.map(tender => (
                  <div key={tender.id} className="overflow-hidden transition-all duration-300 shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: colors.lightText, border: `1px solid ${colors.secondaryBg}30` }}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: `${colors.secondaryBg}20`, color: colors.secondaryBg }}>
                          {tender.category || "General"}
                        </span>
                        <button className="p-1 rounded-full hover:bg-opacity-10" style={{ color: colors.secondaryBg, backgroundColor: `${colors.secondaryBg}15` }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <h3 className="mb-2 text-lg font-bold" style={{ color: colors.primaryText }}>{tender.title || "Untitled Tender"}</h3>
                      <p className="mb-4 text-sm line-clamp-2" style={{ color: colors.secondaryBg }}>{tender.description || "No description available"}</p>
                      
                      <div className="flex items-center mb-2">
                        <Building2 size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm font-medium" style={{ color: colors.primaryText }}>{tender.organization || "Unknown Organization"}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <User size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm font-medium" style={{ color: colors.primaryText }}>{tender.buyer || "Unknown Buyer"}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                        <span className="text-sm font-medium" style={{ color: colors.primaryText }}>
                          {tender.location || "South Africa"}
                          {tender.province && `, ${tender.province}`}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                          <span className="text-sm font-medium" style={{ color: colors.primaryText }}>
                            {tender.value ? formatZAR(tender.value) : "Budget not specified"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" style={{ color: colors.secondaryBg }} />
                          <span className="text-sm font-medium" style={{ color: colors.primaryText }}>
                            {formatDate(tender.deadline || tender.submission_deadline)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => summarizeTender(tender.id)}
                          disabled={summarizing[tender.id]}
                          className="flex items-center justify-center flex-1 gap-2 py-2 font-medium transition-colors rounded-lg disabled:opacity-50"
                          style={{ 
                            backgroundColor: `${colors.secondaryBg}15`, 
                            color: colors.secondaryBg
                          }}
                        >
                          {summarizing[tender.id] ? (
                            <Loader className="animate-spin" size={16} />
                          ) : (
                            <FileText size={16} />
                          )}
                          {summarizing[tender.id] ? 'Summarizing...' : 'Summarize'}
                        </button>
                        <button className="flex-1 py-2 font-medium text-center transition-colors rounded-lg hover:opacity-90" style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Pagination 
              currentPage={filters.page} 
              totalPages={totalPages} 
              onPageChange={(newPage) => {
                const newFilters = { ...filters, page: newPage };
                setFilters(newFilters);
                performSearch(newFilters);
              }}
              colors={colors}
            />
          </>
        )}
      </div>
      
      <SummaryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        summary={currentSummary} 
      />
    </div>
  );
}
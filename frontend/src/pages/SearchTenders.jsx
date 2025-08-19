import { useState } from "react";
import { searchTenders } from "../services/tenderService";
import TenderCard from "../components/Tender/TenderCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchTenders() {
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    province: "",
    deadline: "",
    buyer: "",
    budgetMin: "",
    budgetMax: ""
  });
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 6;

  const handleSearch = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const results = await searchTenders(keyword, filters);
      setTenders(results);
      setCurrentPage(1); // reset pagination after search
    } catch (err) {
      setErrorMsg(err.message || "Failed to fetch tenders.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = tenders.slice(indexOfFirstTender, indexOfLastTender);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <SearchBar keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />

      {/* Filters */}
      <FilterPanel filters={filters} setFilters={setFilters} />

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMsg}</div>
      )}

      {/* Loading Indicator */}
      {loading && <LoadingSpinner />}

      {/* Tender Cards */}
      <div className="grid gap-4">
        {currentTenders.length > 0 ? (
          currentTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)
        ) : (
          !loading && <p>No tenders found.</p>
        )}
      </div>

      {/* Pagination */}
      {tenders.length > tendersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={tenders.length}
          itemsPerPage={tendersPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

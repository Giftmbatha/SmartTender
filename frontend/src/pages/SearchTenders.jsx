import { useState } from "react";
import { searchTenders } from "../tenderService";
import TenderCard from "../components/Tender/TenderCard";

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

  const handleSearch = async () => {
    setLoading(true);
    setErrorMsg("");
    
    try {
      const results = await searchTenders(keyword, filters);
      setTenders(results);
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tenders..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          placeholder="Province"
          value={filters.province}
          onChange={(e) => setFilters({ ...filters, province: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Deadline (YYYY-MM-DD)"
          value={filters.deadline}
          onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Buyer"
          value={filters.buyer}
          onChange={(e) => setFilters({ ...filters, buyer: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Min Budget"
          type="number"
          value={filters.budgetMin}
          onChange={(e) => setFilters({ ...filters, budgetMin: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Max Budget"
          type="number"
          value={filters.budgetMax}
          onChange={(e) => setFilters({ ...filters, budgetMax: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {errorMsg}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <p>Loading tenders...</p>}

      {/* Tender Cards */}
      <div className="grid gap-4">
        {tenders.length > 0 ? (
          tenders.map((tender) => (
            <TenderCard key={tender.id} tender={tender} />
          ))
        ) : (
          !loading && <p>No tenders found.</p>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { searchTenders } from "../services/tenderServices";
import SearchBar from "../components/Tender/SearchBar";
import FilterPanel from "../components/Tender/FilterPanel";
import Results from "../components/Tender/Results";
import Pagination from "../components/Tender/Pagination";

export default function SearchTenders() {
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchTenders(filters);
      setResults(data.results || data); // depends on backend format
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Search Tenders</h1>
      <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      <FilterPanel filters={filters} setFilters={setFilters} />
      {loading ? <p>Loading...</p> : <Results tenders={results} />}
      <Pagination />
    </div>
  );
}

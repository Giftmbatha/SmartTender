import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";

export default function TendersPage() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTenders = async (keyword = "", filters = {}, pageNum = 1) => {
    setLoading(true);

    // TODO: Replace with your FastAPI backend endpoint
    const response = await fetch(
      `/api/tenders?keyword=${keyword}&province=${filters.province || ""}&buyer=${filters.buyer || ""}&deadline=${filters.deadline || ""}&minBudget=${filters.budget?.[0]}&maxBudget=${filters.budget?.[1]}&page=${pageNum}`
    );
    const data = await response.json();

    if (pageNum === 1) {
      setTenders(data.results);
    } else {
      setTenders((prev) => [...prev, ...data.results]);
    }

    setHasMore(data.hasMore);
    setLoading(false);
  };

  const handleSearch = (keyword) => {
    setPage(1);
    fetchTenders(keyword, {}, 1);
  };

  const handleFilter = (filters) => {
    setPage(1);
    fetchTenders("", filters, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTenders("", {}, nextPage);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />

      {loading ? (
        <p className="mt-4 text-center text-blue-500">Loading...</p>
      ) : (
        <Results tenders={tenders} />
      )}

      {hasMore && !loading && (
        <div className="flex justify-center p-4">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}

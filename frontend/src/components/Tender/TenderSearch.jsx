// src/components/TenderSearch.jsx
import { useState } from "react";

export default function SearchTenders() {
  const [keyword, setKeyword] = useState("");
  const [province, setProvince] = useState("");
  const [buyer, setBuyer] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();

      if (keyword) params.append("keyword", keyword);
      if (province) params.append("province", province);
      if (buyer) params.append("buyer", buyer);
      if (budgetMin) params.append("budget_min", budgetMin);
      if (budgetMax) params.append("budget_max", budgetMax);
      if (deadline) params.append("submission_deadline", deadline);

      const response = await fetch(`http://localhost:8000/api/search?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Search failed. Maybe plan restriction?");
      }

      const data = await response.json();
      setResults(data.releases || []); // adjust if API response differs
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-800 shadow-md rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">Search Tenders</h2>
      <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Buyer"
          value={buyer}
          onChange={(e) => setBuyer(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <input
          type="number"
          placeholder="Budget Min"
          value={budgetMin}
          onChange={(e) => setBudgetMin(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <input
          type="number"
          placeholder="Budget Max"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 text-white bg-gray-700 rounded"
        />
        <button
          type="submit"
          className="col-span-2 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((tender, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded">
                <h3 className="text-lg font-bold text-indigo-300">
                  {tender.tender?.title || "Untitled Tender"}
                </h3>
                <p className="text-gray-300">
                  Buyer: {tender.buyer?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-400">
                  Deadline: {tender.tender?.submissionMethodDetails || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No results yet. Try searching!</p>
        )}
      </div>
    </div>
  );
}

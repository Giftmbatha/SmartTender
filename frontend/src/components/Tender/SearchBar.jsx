import { useState } from "react";

export default function SearchBar({ filters, setFilters, onSearch }) {
  const [input, setInput] = useState(filters.keyword || "");

  const handleSearch = () => {
    setFilters({ ...filters, keyword: input });
    onSearch();
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search tenders..."
        className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-indigo-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  );
}

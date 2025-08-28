export default function FilterPanel({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
      <input
        type="text"
        name="province"
        value={filters.province || ""}
        onChange={handleChange}
        placeholder="Province"
        className="px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
      />
      <input
        type="text"
        name="buyer"
        value={filters.buyer || ""}
        onChange={handleChange}
        placeholder="Buyer"
        className="px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
      />
      <input
        type="date"
        name="submission_deadline"
        value={filters.submission_deadline || ""}
        onChange={handleChange}
        className="px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
      />
      <div className="flex gap-2">
        <input
          type="number"
          name="budget_min"
          value={filters.budget_min || ""}
          onChange={handleChange}
          placeholder="Min Budget"
          className="w-1/2 px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
        />
        <input
          type="number"
          name="budget_max"
          value={filters.budget_max || ""}
          onChange={handleChange}
          placeholder="Max Budget"
          className="w-1/2 px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
        />
      </div>
    </div>
  );
}

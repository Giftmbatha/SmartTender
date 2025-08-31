import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";

export default function TenderCard({ tender }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    setLoading(true);
    try {
      // Navigate to summary page with tender ID
      navigate(`/summary/${tender.id}`);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="p-4 transition bg-gray-800 rounded-md shadow hover:shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-400">{tender.title || "Untitled Tender"}</h3>
      <p className="text-gray-300">Buyer: {tender.buyer || "Unknown"}</p>
      <p className="text-gray-400">Province: {tender.province || "N/A"}</p>
      <p className="text-gray-400">Deadline: {tender.submission_deadline || "Not specified"}</p>
      <p className="text-gray-400">
        Budget: {tender.budget_min || "?"} - {tender.budget_max || "?"}
      </p>
      
      <Button onClick={handleSummarize} disabled={loading}>
        {loading ? "Loading..." : "Summarize"}
      </Button>
    </div>
  );
}

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
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
      <h3 className="text-lg font-bold">{tender.title}</h3>
      <p className="text-gray-600">{tender.description}</p>
      <p className="text-sm mt-2">
        <strong>Province:</strong> {tender.province}
      </p>
      <p className="text-sm">
        <strong>Deadline:</strong> {tender.deadline}
      </p>
      <p className="text-sm font-semibold text-green-700">
        <strong>Budget:</strong> R{tender.budget}
      </p>
      
      <Button onClick={handleSummarize} disabled={loading}>
        {loading ? "Loading..." : "Summarize"}
      </Button>
    </div>
  );
}

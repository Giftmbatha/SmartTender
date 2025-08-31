import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import { Loader2 } from "lucide-react";

export default function SummaryResult() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get(`/ai/summarize/${id}`);
        setSummary(res.data);
      } catch (err) {
        setError("Failed to load summary");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{summary.text}</p>

      <div className="mt-6 grid gap-2">
        <h3 className="font-semibold">Key Info</h3>
        <p><strong>Budget:</strong> {summary.key_info?.budget || "N/A"}</p>
        <p><strong>Deadline:</strong> {summary.key_info?.deadline || "N/A"}</p>
        <p><strong>Buyer:</strong> {summary.key_info?.buyer || "N/A"}</p>
      </div>
    </div>
  );
}

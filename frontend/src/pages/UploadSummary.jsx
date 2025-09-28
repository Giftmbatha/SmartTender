import { useState } from "react";
import api from "@/services/api"; 
import { Button } from "@/components/ui/button";

export default function UploadSummary() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      const res = await api.post("/ai/summarize/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.href = `/summary/result/${res.data.id}`;
    } catch (err) {
      setError(err.response?.data?.detail || "File not supported");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Upload Document for Summary</h2>
      <form onSubmit={handleUpload} className="grid gap-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Generate Summary"}
        </Button>
      </form>
    </div>
  );
}

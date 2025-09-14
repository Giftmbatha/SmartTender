import React, { useState } from "react";
import { summarizeFile } from "../services/tenderServices";
import { FileUp, FileText, Loader2, ArrowRightCircle, TriangleAlert } from 'lucide-react';

const colors = {
  primary: "#708A58",
  secondary: "#2D4F2B",
  background: "#FAF7F3",
};

export default function SummarizeTenders() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await summarizeFile(file);
      setSummary(data);
    } catch (err) {
      console.error(err);
      setError("File not supported or failed to summarize.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    // Clear any previous state
    setSummary(null);
    setError(null);
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-sans" style={{ backgroundColor: colors.background }}>
      <div className="w-full max-w-3xl p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-3xl hover:shadow-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold" style={{ color: colors.secondary }}>
            Tender Summary Tool
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Upload a tender document and get an AI-powered summary instantly.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-6 text-sm font-medium text-gray-700 transition-colors duration-300 border-2 border-dashed rounded-lg cursor-pointer hover:border-solid hover:border-gray-400" style={{ borderColor: colors.primary }}>
            <FileUp className="w-6 h-6 mr-2" style={{ color: colors.primary }} />
            <span style={{ color: colors.primary }}>
              {file ? `Document selected: ${file.name}` : "Click to upload a document"}
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Summarize Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`flex items-center justify-center w-full px-4 py-3 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-md hover:scale-105 hover:shadow-lg ${!file || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: colors.primary }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Get Summary
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="relative flex items-center p-4 mt-6 text-sm rounded-lg" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }} role="alert">
            <TriangleAlert className="w-5 h-5 mr-3" />
            <span className="block">{error}</span>
          </div>
        )}

        {/* Summary Output Section */}
        {summary && (
          <div className="p-6 mt-8 rounded-lg" style={{ backgroundColor: colors.background }}>
            <div className="flex items-center mb-4">
              <ArrowRightCircle className="w-6 h-6 mr-2" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-bold" style={{ color: colors.secondary }}>
                Summary
              </h3>
            </div>
            {summary.summary && <p className="mb-4 leading-relaxed text-gray-800 whitespace-pre-wrap">{summary.summary}</p>}
            
            <h3 className="mt-4 font-semibold" style={{ color: colors.secondary }}>Key Deadlines</h3>
            {summary.key_deadlines && <p className="mt-2 text-gray-800">{summary.key_deadlines}</p>}
            
            <h3 className="mt-4 font-semibold" style={{ color: colors.secondary }}>Budget Highlights</h3>
            {summary.budget_highlights && <p className="mt-2 text-gray-800">{summary.budget_highlights}</p>}
            
            <h3 className="mt-4 font-semibold" style={{ color: colors.secondary }}>Buyer Details</h3>
            {summary.buyer_details && <p className="mt-2 text-gray-800">{summary.buyer_details}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
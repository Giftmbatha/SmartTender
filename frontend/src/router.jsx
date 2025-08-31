import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import UploadSummary from "@/pages/UploadSummary";
import SummaryResult from "@/pages/SummaryResult";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/upload-summary", element: <UploadSummary /> },
  { path: "/summary/:id", element: <SummaryResult /> },
  { path: "/summary/result/:id", element: <SummaryResult /> },
]);

export default router;

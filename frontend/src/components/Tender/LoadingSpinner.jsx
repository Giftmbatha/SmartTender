import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-500 font-medium">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;

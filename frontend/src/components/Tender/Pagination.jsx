import React from "react";

// Enhanced Pagination component
function Pagination({ currentPage, totalPages, onPageChange, colors }) {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50"
        style={{ 
          backgroundColor: currentPage === 1 ? 'transparent' : `${colors.secondaryBg}20`,
          color: colors.primaryText,
          border: `1px solid ${colors.secondaryBg}30`
        }}
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${currentPage === page ? 'font-bold' : ''}`}
          style={{ 
            backgroundColor: currentPage === page ? colors.secondaryBg : 'transparent',
            color: currentPage === page ? colors.lightText : colors.primaryText,
            border: `1px solid ${colors.secondaryBg}30`
          }}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50"
        style={{ 
          backgroundColor: currentPage === totalPages ? 'transparent' : `${colors.secondaryBg}20`,
          color: colors.primaryText,
          border: `1px solid ${colors.secondaryBg}30`
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
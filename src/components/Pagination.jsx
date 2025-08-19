import React from "react";

function Pagination({ totalPages = 5, currentPage = 1, onPageChange }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange && onPageChange(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-md ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white shadow-lg shadow-purple-500/25 border border-white/20"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
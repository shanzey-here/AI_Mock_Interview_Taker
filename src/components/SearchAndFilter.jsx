import React from "react";
import { Search } from "lucide-react";

function SearchAndFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  onSearch,
  showSearch = true 
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white shadow-lg shadow-purple-500/25 border border-white/20"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {showSearch && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 pl-12 text-sm w-80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors">
            Go
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import { latestArticles } from "./cardData";

export default function Latest({ 
  articles = latestArticles, 
  showPagination = true, 
  itemsPerPage = 4,
  title = "Latest" 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <section className="text-white px-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {showPagination && totalPages > 1 && (
          <span className="text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, articles.length)} of {articles.length} articles
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentArticles.map((article) => (
          <BlogCard 
            key={article.id}
            article={article}
            variant="compact"
            showImage={false}
            titleSize="text-lg"
            descriptionLines={3}
            showArrow={true}
          />
        ))}
      </div>

      {/* Empty state */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No articles available at the moment.</p>
        </div>
      )}

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
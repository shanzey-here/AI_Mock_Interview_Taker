import React, { useState } from "react";
import BlogCard from "./BlogCard";
import SearchAndFilter from "./SearchAndFilter";
import { cardData } from "./cardData";

export default function MainContent({ articles = cardData, showSearch = true }) {
  const [category, setCategory] = useState("All categories");
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = ["All categories", "Company", "Product", "Design", "Engineering"];

  // Filter articles by category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = category === "All categories" || article.tag === category;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen text-white px-2 py-8">
      <section className="w-full flex flex-col gap-4">
        <div className="text-left">
          <h1 className="text-6xl font-bold mb-4 text-white">Blog</h1>
          <p className="text-xl text-gray-300">
            Stay in the loop with the latest about our products
          </p>
        </div>

        <SearchAndFilter 
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          onSearch={handleSearch}
          showSearch={showSearch}
        />

        <div className="space-y-6">
          {/* Row 1: Two Large Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.slice(0, 2).map((article) => (
              <BlogCard 
                key={article.id}
                article={article}
                variant="default"
                titleSize="text-2xl"
                descriptionLines={3}
              />
            ))}
          </div>

          {/* Row 2: Custom Layout - Left Card + Middle Cards + Right Card */}
          {filteredArticles.length > 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {/* Left Card */}
              <div className="lg:col-span-2">
                <BlogCard 
                  article={filteredArticles[2]}
                  variant="default"
                  titleSize="text-lg"
                  descriptionLines={3}
                />
              </div>

              {/* Middle Cards - No Images */}
              <div className="lg:col-span-2 space-y-6">
                {filteredArticles.slice(3, 5).map((article) => (
                  <BlogCard 
                    key={article.id}
                    article={article}
                    variant="compact"
                    showImage={false}
                    titleSize="text-lg"
                    descriptionLines={2}
                  />
                ))}
              </div>

              {/* Right Card */}
              <div className="lg:col-span-2">
                {filteredArticles[5] && (
                  <BlogCard 
                    article={filteredArticles[5]}
                    variant="default"
                    titleSize="text-lg"
                    descriptionLines={3}
                  />
                )}
              </div>
            </div>
          )}

          {/* Additional cards if more than 6 */}
          {filteredArticles.length > 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredArticles.slice(6).map((article) => (
                <BlogCard 
                  key={article.id}
                  article={article}
                  variant="default"
                  titleSize="text-xl"
                  descriptionLines={3}
                />
              ))}
            </div>
          )}

          {/* No results message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setCategory("All categories"); setSearchTerm("");}}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
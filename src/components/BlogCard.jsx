import React from "react";
import { useNavigate } from "react-router-dom";
import Author from "./Author";
import Tag from "./Tag";

function BlogCard({ 
  article, 
  variant = "default", 
  showImage = true, 
  className = "",
  titleSize = "text-2xl",
  descriptionLines = 3,
  showArrow = false 
}) {
  const navigate = useNavigate();
  
  const baseClasses = "group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 cursor-pointer";
  
  const variants = {
    default: "h-full flex flex-col",
    compact: "flex flex-col gap-4",
    minimal: "flex flex-col gap-4"
  };

  const handleClick = () => {
    navigate(`/article/${article.id}`);
    // Ensure scroll to top happens immediately on navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={handleClick}
    >
      {showImage && article?.img && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.img} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
      )}
      
      <div className={`${showImage ? 'p-6' : 'p-6'} space-y-4 ${variant === 'default' ? 'flex-grow' : ''}`}>
        {variant === 'compact' && (
          <div className="flex items-center justify-between">
            <Tag tag={article.tag} variant="compact" />
            <span className="text-gray-400 text-sm">{article.date}</span>
          </div>
        )}
        
        {variant === 'default' && (
          <div className="flex items-center gap-3">
            <Tag tag={article.tag} />
          </div>
        )}

        <h3 className={`${titleSize} font-bold text-white transition-all duration-300 relative cursor-pointer ${descriptionLines < 3 ? `line-clamp-${descriptionLines}` : ''}`}>
          {article.title}
          {showArrow && (
            <span className="absolute right-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300 text-purple-400 ml-2">
              →
            </span>
          )}
        </h3>
        
        <p className={`text-gray-300 leading-relaxed text-sm line-clamp-${descriptionLines}`}>
          {article.description}
        </p>

        {variant === 'compact' && (
          <Author 
            authors={article.authors} 
            date={article.date} 
            variant="inline" 
            showDate={false}
          />
        )}
      </div>
      
      {variant === 'default' && (
        <Author 
          authors={article.authors} 
          date={article.date} 
          variant="default"
        />
      )}
    </div>
  );
}

export default BlogCard;
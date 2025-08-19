import React from "react";

function Author({ authors, date, variant = "default", showDate = true }) {
  const variants = {
    default: {
      container: "flex items-center justify-between text-sm px-6 py-4 border-t border-white/10",
      avatarSize: "w-8 h-8",
      textSize: "text-sm",
    },
    compact: {
      container: "flex items-center justify-between text-sm",
      avatarSize: "w-6 h-6",
      textSize: "text-sm",
    },
    inline: {
      container: "flex items-center gap-3 pt-2",
      avatarSize: "w-6 h-6",
      textSize: "text-sm",
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={currentVariant.container}>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {authors.map((author, i) => (
            <div
              key={i}
              className={`${currentVariant.avatarSize} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white/20 flex items-center justify-center text-xs font-medium text-white shadow-lg`}
            >
              {author[0]}
            </div>
          ))}
        </div>
        <span className={`text-gray-300 font-medium ${currentVariant.textSize}`}>
          {authors.join(", ")}
        </span>
      </div>
      {showDate && <span className="text-gray-400">{date}</span>}
    </div>
  );
}

export default Author;
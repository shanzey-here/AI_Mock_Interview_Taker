import React from "react";

function Tag({ tag, variant = "default" }) {
  const variants = {
    default: "px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-400/30",
    compact: "text-xs font-medium px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-400/30 inline-block w-fit"
  };

  return (
    <span className={variants[variant]}>
      {tag}
    </span>
  );
}

export default Tag;
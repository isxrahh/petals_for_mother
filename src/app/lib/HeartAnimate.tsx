import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function HeartButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setIsAnimating(true);

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 transition-transform active:scale-90 group"
    >
      <Heart
        size={28}
        className={`
          transition-all duration-300
          ${isLiked 
            ? "fill-[#e01e48] text-[#e1255a] scale-125" 
            : "text-[#FBCFE8] group-hover:text-[#D85C83]"
          }
          ${isAnimating ? "animate-throb" : ""}
        `}
      />
    </button>
  );
}
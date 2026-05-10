"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface BeatingHeartProps {
  size?: number;
  className?: string;
}

export default function BeatingHeart({
  size = 80,
  className = "",
}: BeatingHeartProps) {
  return (
    <motion.div
      className={`heart-container ${className}`}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}>
      <Heart
        size={size}
        className="heart text-blush-rose drop-shadow-xl"
        fill="currentColor"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

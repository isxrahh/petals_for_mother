"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Petal = () => {
  const [config] = useState({
    // Start anywhere from -5% to 105% to ensure edges are covered
    left: Math.random() * 110 - 5, 
    duration: Math.random() * 7 + 8, // Slower fall looks more natural
    delay: Math.random() * 15, // Longer delay range for a steady stream
    rotate: Math.random() * 360,
    size: Math.random() * 20 + 10,
    // How far they "drift" horizontally while falling
    drift: (Math.random() - 0.5) * 100, 
  });

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, rotate: config.rotate, x: 0 }}
      animate={{ 
        y: "110vh", 
        opacity: [0, 0.8, 0.8, 0],
        // This spreads them horizontally as they fall
        x: [0, config.drift, config.drift * -0.5, config.drift * 1.2],
        rotate: config.rotate + 720 // More spins
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        delay: config.delay,
        ease: [0.45, 0, 0.55, 1] // Custom "flutter" timing
      }}
      className="absolute pointer-events-none"
      style={{
        willChange: 'transform',
        left: `${config.left}%`,
        filter: 'blur(1.2px)',
      }}
    >
      <svg
        width={config.size}
        height={config.size}
        viewBox="0 0 24 24"
        fill="#ffccd5" // Soft petal pink
        className="drop-shadow-sm"
      >
        <path d="M12,2C12,2 4,10 4,15C4,19.42 7.58,23 12,23C16.42,23 20,19.42 20,15C20,10 12,2 12,2Z" />
      </svg>
    </motion.div>
  );
};

export default function PetalAnimation() {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Increase density for full screen coverage
    // 30-40 petals usually looks good without killing the battery
    setPetals(Array.from({ length: 35 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Optional: Add a subtle gradient overlay to make the petals 
        look like they are in a 3D space 
      */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-pink-800/30" />
      
      {petals.map((id) => (
        <Petal key={id} />
      ))}
    </div>
  );
}
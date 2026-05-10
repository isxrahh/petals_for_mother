"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteData {
  quote: string;
  author: string;
}

const fallbacks = [
  {
    quote:
      "A mother is she who can take the place of all others but whose place no one else can take.",
    author: "Cardinal Mermillod",
  },
  {
    quote: "Life began with waking up and loving my mother’s face.",
    author: "George Eliot",
  },
];

export default function MotherDayStack() {
  const [currentQuote, setCurrentQuote] = useState<QuoteData>({
    quote: "Tap to bloom a message...",
    author: "Mom",
  });

  const [nextQuote, setNextQuote] = useState<QuoteData | null>(null);

  const [count, setCount] = useState(0);
  const [side, setSide] = useState(1);
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    prefetchNextQuote();
  }, []);

  const prefetchNextQuote = async () => {
    try {
      const res = await fetch("/api/generate-quote", {
        method: "POST",
        body: JSON.stringify({
          flowerName: "Spring Flowers",
          history: historyRef.current.slice(-10),
        }),
      });
      const data: QuoteData = await res.json(); 
      setNextQuote(data);
    } catch (err) {
      console.error("Prefetch failed", err);
    }
  };

  const handleFlip = () => {
    if (!nextQuote) return;

    historyRef.current.push(nextQuote.quote);
    const activeQuote =
      nextQuote || fallbacks[Math.floor(Math.random() * fallbacks.length)];

    setCurrentQuote(activeQuote);
    setCount((prev) => prev + 1);
    setSide((prev) => prev * -1);

    setNextQuote(null);
    prefetchNextQuote();
  };

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden min-h-175">

      <div
        className="relative w-full max-w-lg h-137.5 cursor-pointer"
        onClick={handleFlip}>
        <motion.div
          className="absolute inset-0 bg-pink-50 rounded-2xl border border-pink-100 shadow-sm opacity-40"
          initial={{ rotate: -12, x: -35, y: 10 }}
          whileHover={{ rotate: -2, x: -5, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 1.5,
          }}
          style={{ zIndex: 0 }}
        />
        <motion.div
          className="absolute inset-0 bg-pink-100 rounded-2xl border border-pink-200 shadow-md"
          initial={{ rotate: 10, x: 30, y: 5 }}
          whileHover={{ rotate: 2, x: 5, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 1.5,
          }}
          style={{ zIndex: 10 }}
        />
        <motion.div
          className="absolute inset-0 bg-pink-50 rounded-2xl border border-pink-100 shadow-lg"
          initial={{ rotate: -5, x: -15, y: 2 }}
          whileHover={{ rotate: -1, x: -2, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 1.5,
          }}
          style={{ zIndex: 20 }}
        />
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl border border-pink-100 shadow-xl"
          initial={{ rotate: 3, x: 10, y: 0 }}
          whileHover={{ rotate: 0, x: 0, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 1.5,
          }}
          style={{ zIndex: 30 }}
        />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={count}
            className="absolute inset-0 bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl border border-pink-50 select-none z-40"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{
              x: side * 700,
              y: -150,
              rotate: side * 50,
              opacity: 0,
              transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }} 
              className="flex flex-col items-center">
              <span className="text-7xl mb-4">🌸</span>
              <p className="text-3xl max-w-lg my-6 font-serif text-gray-800 italic leading-snug">
                "{currentQuote.quote}"
              </p>
              <div className="w-12 h-px bg-pink-200 my-6" />
              <p className="text-sm font-bold text-pink-600 tracking-widest uppercase">
                — {currentQuote.author}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

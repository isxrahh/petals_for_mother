"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import giftData from "@/types/data";

import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  Home,
  Gift,
  MessageSquare,
  Image as ImageIcon,
  PartyPopper,
  Flower2,
} from "lucide-react";
import HeartButton from "../lib/HeartAnimate";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};


export default function GiftsPage() {
  const [activeTab, setActiveTab] = useState<Category>("The Nurturer");
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSurpriseMe = () => {
    setIsSpinning(true);
    const categories = Object.keys(giftData) as Category[];

    let iterations = 0;
    const interval = setInterval(() => {
      const randomCat =
        categories[Math.floor(Math.random() * categories.length)];
      setActiveTab(randomCat);
      iterations++;

      if (iterations > 8) {
        clearInterval(interval);
        setIsSpinning(false);
        triggerConfetti();
      }
    }, 100);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 250,
      spread: 70,
      origin: { y: 0.6 },
      colors: [
        "#ffc2d4",
        "#ff9ebb",
        "#ffe0e9",
        "#ff7aa2",
        "#e05780",
        "#b9375e",
        "#8a2846",
        "#602437",
        "#522e38",
        "#fef2f6",
        "#fec5d5",
      ],
    });

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D85C83", "#F9A8D4"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D85C83", "#F9A8D4"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="bg-main min-h-screen pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col items-center">
          <motion.div variants={fadeUpVariant}>
            <Gift
              className="text-pink-600 mx-auto mb-6"
              size={90}
              strokeWidth={2}
            />
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="text-primary text-6xl sm:text-8xl font-serif tracking-tight">
            Curated Gift Finder
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-body text-2xl font-serif mt-6 max-w-lg mx-auto">
            Find the perfect gift that matches her personality
          </motion.p>
        </motion.div>

        <div className="w-full max-w-4xl px-4 pt-10">
          <motion.button
            onClick={handleSurpriseMe}
            disabled={isSpinning}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            whileTap={{ scale: 0.95 }}
            className={`w-full text-white py-4 rounded-xl flex items-center justify-center gap-2 text-xl font-medium transition-all shadow-md mb-8 ${
              isSpinning
                ? "bg-[#9D4D68] cursor-wait"
                : "bg-[#D85C83] hover:bg-[#c44b72]"
            }`}>
            <motion.div
              animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                repeat: isSpinning ? Infinity : 0,
                duration: 0.5,
                ease: "linear",
              }}>
              <Sparkles size={24} />
            </motion.div>
            {isSpinning ? "Choosing..." : "Surprise Me!"}
          </motion.button>
          {/* Tab Filters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {(Object.keys(giftData) as Category[]).map((cat) => (
              <motion.button
                variants={fadeUpVariant}
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === cat
                    ? "bg-[#D85C83] text-white shadow-inner"
                    : "bg-[#FBCFE8] text-[#831843] hover:bg-[#F9A8D4]"
                }`}>
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            layout 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="bg-white/80 backdrop-blur-sm rounded-[40px] p-8 md:p-12 shadow-xl border border-white/50">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif text-[#702D44] mb-2">
                {activeTab}
              </h2>
              <p className="text-[#9D4D68] italic font-light">
                {giftData[activeTab].description}
              </p>
            </div>

            <motion.div layout className="space-y-4 relative">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeTab}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  exit="hidden">
                  {giftData[activeTab].items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className="text-xl sm:text-4xl bg-[#FFF1F2] w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl">
                          {item.icon}
                        </span>
                        <div className="text-left">
                          <h3 className="text-sm sm:text-xl font-medium text-[#702D44]">
                            {item.title}
                          </h3>
                          <p className="text-[#9D4D68] mt-2 font-semibold">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                     <HeartButton/>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

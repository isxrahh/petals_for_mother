"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import BeatingHeart from "@/components/BeatingHeart";
import PetalAnimation from "@/components/PetalsRain";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

export default function Home() {
  return (
    <main className="bg-main min-h-screen relative overflow-hidden">
      <PetalAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col items-center mt-12">
          <BeatingHeart size={100} />
        </motion.div>
        <div className="max-w-5xl mx-auto px-6 pt-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-primary text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight">
            Happy Mother’s Day
          </motion.h1>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex items-center justify-center gap-6 mt-2 pt-12 text-pink-600">
            <motion.div variants={fadeUpVariant}>
              <Sparkles className="text-blush-rose" size={36} />
            </motion.div>

            <motion.p
              variants={fadeUpVariant}
              className="text-xl sm:text-3xl font-serif max-w-2xl">
              A celebration of love, care, and endless devotion
            </motion.p>

            <motion.div variants={fadeUpVariant}>
              <Sparkles className="text-blush-rose" size={36} />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.25, delayChildren: 0.1 },
              },
            }}
            className="mt-20">
            <motion.div
              variants={fadeUpVariant}
              className="bg-card rounded-3xl border border-border-medium p-10 md:p-16 shadow-soft">
              <motion.h3
                variants={fadeUpVariant}
                className="text-primary text-2xl md:text-3xl font-serif leading-relaxed">
                Every mother deserves to feel cherished. Explore our special
                features to create personalized gifts, heartfelt messages,
                beautiful memories, and more—all designed to honor the
                incredible woman who means the world to you.
              </motion.h3>

              {/* Feature Buttons */}
              <motion.div
                variants={fadeUpVariant}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                {[
                  "💌 Personal Messages",
                  "📸 Memory Collection",
                  "🎁 Curated Gifts",
                  "🎉 Celebration Tools",
                ].map((text, index) => (
                  <motion.button
                    key={index}
                    variants={fadeUpVariant}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-secondary text-lg py-6 rounded-2xl font-medium">
                    {text}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3, delayChildren: 0.2 },
              },
            }}
            className="mt-24">
            <motion.p
              variants={fadeUpVariant}
              className="font-serif text-2xl md:text-3xl text-muted max-w-3xl mx-auto leading-relaxed italic">
              "A mother's love is the fuel that enables a normal human being to
              do the impossible."
            </motion.p>

            <motion.div variants={fadeUpVariant} className="my-12">
              <button className="btn-primary liquid-btn text-xl px-12 py-6 flex items-center gap-3 mx-auto">
                Explore More
                <ArrowDown className="w-6 h-6" />
              </button>
            </motion.div>
            <motion.p
              variants={fadeUpVariant}
              className="font-serif text-pink-600 text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed italic py-12">
              Made with love by Sayantani
            </motion.p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

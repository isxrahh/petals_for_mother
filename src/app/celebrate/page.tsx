'use client'
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, PartyPopperIcon } from "lucide-react";
import CardMaker from "@/components/CardMaker";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
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
const page = () => {
  return (
    <section className="bg-main min-h-screen pb-24 pt-12">
      <div className="mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center">
          <motion.div variants={fadeUpVariant}>
            <PartyPopperIcon
              className="text-pink-600 mx-auto mb-6"
              size={90}
              strokeWidth={2}
            />
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="text-primary text-6xl sm:text-8xl font-serif tracking-tight">
            Celebration Toolkit
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-body text-2xl font-serif mt-6 max-w-lg mx-auto">
          Create beautiful frames and cards to share
          </motion.p>
        </motion.div>
        <CardMaker/>
      </div>
    </section>
  );
};

export default page;

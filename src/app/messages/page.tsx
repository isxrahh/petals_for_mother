'use client'
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, Inbox, PartyPopperIcon } from "lucide-react";
import MotherDayCards from "@/components/MotherDayCard";

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


const MessagesPage = () => {
  return (
    <section className="bg-main min-h-screen pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Icon */}
          <motion.div variants={fadeUpVariant}>
            <Inbox
              className="text-pink-600 mx-auto mb-6"
              size={90}
              strokeWidth={2}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUpVariant}
            className="text-primary text-5xl sm:text-7xl font-serif tracking-tight"
          >
            Messages for my mother
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariant}
            className="text-body text-2xl font-serif mt-6 max-w-lg mx-auto"
          >
            Generate heartfelt quotes and personalized eCards
          </motion.p>

          {/* The Component Wrapper */}
          <motion.div 
            variants={fadeUpVariant} 
            className="w-full mt-12" // Added width and margin to ensure visibility
          >
            <MotherDayCards />
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default MessagesPage;
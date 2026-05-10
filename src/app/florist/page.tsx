"use client";

import { Flower, Flower2, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const bouquetOptions = [
  {
    emoji: "💐",
    name: "Elegant Bouquet",
    meaning:
      "Symbolizes love, gratitude, and nurturing care — just like a mother.",
  },
  {
    emoji: "🌸",
    name: "Cherry Blossom",
    meaning: "Represents beauty, grace, and the gentle strength of a mother.",
  },
  {
    emoji: "🌷",
    name: "Tulip Bouquet",
    meaning: "Symbolizes perfect love and care.",
  },
  {
    emoji: "🌹",
    name: "Rose Bouquet",
    meaning: "Represents deep love, respect, and admiration.",
  },
  {
    emoji: "🌺",
    name: "Hibiscus & Orchids",
    meaning: "Brings warmth, beauty, and tropical joy.",
  },
  {
    emoji: "🌻",
    name: "Sunflower Bouquet",
    meaning: "Symbolizes adoration, loyalty, and positivity.",
  },
  {
    emoji: "🌵",
    name: "Cactus",
    meaning:
      "Protective and resilient; she thrives and provides life even in the harshest conditions.",
  },
  {
    emoji: "☘️",
    name: "Shamrock",
    meaning:
      'Represents the "Holy Trinity" of a mother’s roles: protector, teacher, and nurturer.',
  },
  {
    emoji: "🏵️",
    name: "Rosette",
    meaning:
      "An award of excellence; symbolizing the grace and decorative beauty she adds to the home.",
  },
  {
    emoji: "🌾",
    name: "Sheaf of Rice",
    meaning:
      "The ultimate provider; representing the physical and spiritual nourishment she gives.",
  },
  {
    emoji: "🌼",
    name: "Blossom",
    meaning:
      "A mother’s joy in watching her children grow and reach their full potential.",
  },
  {
    emoji: "🌴",
    name: "Palm Tree",
    meaning:
      "A symbol of peace and flexibility; she remains standing through every family storm.",
  },
  {
    emoji: "🎍",
    name: "Pine Decoration",
    meaning:
      "Symbolizes longevity and a fresh start; the foundation of family tradition and luck.",
  },
  {
    emoji: "🪻",
    name: "Hyacinth",
    meaning:
      "Deeply sincere and constant; representing a mother’s playfulness and unwavering devotion.",
  },
  {
    emoji: "🍀",
    name: "Four Leaf Clover",
    meaning:
      "The rare luck of having her; representing faith, hope, love, and protection.",
  },
];

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

export default function BouquetPage() {
  const [bouquet, setBouquet] = useState<{
    emoji: string;
    name: string;
    meaning: string;
  } | null>(null);

  const [quote, setQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastBouquetIndex, setLastBouquetIndex] = useState<number | null>(null);
  const [lastQuote, setLastQuote] = useState<string>("");

  const fetchQuote = async (flowerName: string) => {
    const res = await fetch("https://petals-for-mother.vercel.app/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flowerName,
      }),
    });

    const data = await res.json();

    return {
      quote: data.quote,
      author: `— ${data.author}`,
    };
  };
  const generateBouquet = async () => {
    setIsLoading(true);

    try {
      let randomIndex;

      // Prevent same bouquet twice consecutively
      do {
        randomIndex = Math.floor(Math.random() * bouquetOptions.length);
      } while (bouquetOptions.length > 1 && randomIndex === lastBouquetIndex);

      const randomBouquet = bouquetOptions[randomIndex];

      let generatedQuote;
      let attempts = 0;

      // Prevent same quote twice consecutively
      do {
        generatedQuote = await fetchQuote(randomBouquet.name);
        attempts++;
      } while (generatedQuote.quote === lastQuote && attempts < 5);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setBouquet(randomBouquet);
      setQuote(generatedQuote);

      setLastBouquetIndex(randomIndex);
      setLastQuote(generatedQuote.quote);
    } catch (error) {
      console.error(error);

      setQuote({
        quote: "Her love blooms endlessly, like flowers in spring.",
        author: "— For Mom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-main min-h-screen pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center">
          <motion.div variants={fadeUpVariant}>
            <Flower2
              className="text-pink-600 mx-auto mb-6"
              size={90}
              strokeWidth={2}
            />
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="text-primary text-6xl sm:text-8xl font-serif tracking-tight">
            AI Florist
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-body text-2xl font-serif mt-6 max-w-lg mx-auto">
            Generate a unique bouquet with meaningful flowers
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-16">
          <motion.div
            variants={fadeUpVariant}
            className="bg-card-light rounded-3xl border border-border-medium p-12 md:p-16 shadow-soft">
            <motion.h2
              variants={fadeUpVariant}
              className="text-primary text-3xl md:text-4xl font-serif mb-6">
              Ready to create a magical bouquet?
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              className="text-muted font-serif text-xl leading-relaxed">
              Each bouquet is uniquely generated with flowers that carry special
              meanings for your mother.
            </motion.p>

            {/* Bouquet Display Area */}
            <div className="min-h-95 flex flex-col items-center justify-center relative">
              <AnimatePresence mode="wait">
                {!bouquet && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center">
                    <Flower
                      className="text-blush-rose/30 mx-auto mb-6"
                      size={140}
                    />
                    <p className="text-muted text-xl">
                      Your bouquet is waiting to bloom...
                    </p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center">
                    <div className="sunset-gradient w-40 h-40 rounded-full flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2.5 }}>
                        <Flower2 size={70} className="text-white" />
                      </motion.div>
                    </div>
                    <p className="text-muted mt-8 text-lg font-serif">
                      Crafting something beautiful...
                    </p>
                  </motion.div>
                )}

                {bouquet && !isLoading && (
                  <motion.div
                    key={bouquet.emoji}
                    initial={{ opacity: 0, scale: 0.6, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="text-center">
                    <motion.div
                      className="text-[150px] md:text-[190px] drop-shadow-2xl"
                      initial={{ scale: 0.4, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        bounce: 0.45,
                        duration: 1.4,
                      }}>
                      {bouquet.emoji}
                    </motion.div>

                    <h3 className="text-3xl font-serif text-primary mb-3">
                      {bouquet.name}
                    </h3>
                    <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
                      {bouquet.meaning}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quote */}
            <AnimatePresence>
              {quote && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-card/70 backdrop-blur rounded-2xl p-6 border border-pink-200">
                  <p className="text-xl italic font-serif text-primary leading-relaxed">
                    "{quote.quote}"
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <p className="text-muted">{quote.author}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <motion.button
              onClick={generateBouquet}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05, y: -4 } : {}}
              whileTap={!isLoading ? { scale: 0.97 } : {}}
              className="btn-primary liquid-btn w-full mt-12 py-7 text-2xl flex items-center justify-center gap-3 rounded-3xl font-medium disabled:opacity-70">
              {isLoading ? (
                <>Blooming Flowers...</>
              ) : (
                <>
                  <RefreshCw size={28} className={bouquet ? "rotate-45" : ""} />
                  {bouquet ? "Generate New Bouquet" : "Generate Bouquet"}
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="text-muted mt-12 text-lg font-serif">
          Tap the button and watch the magic bloom ✨
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { memories, Memory } from "@/types/data";

export default function VintageFilmStrip() {
  const row1 = [...memories.slice(0, 5), ...memories.slice(0, 5)];
  const row2 = [...memories.slice(5, 10), ...memories.slice(5, 10)];

  const FilmRow = ({ data, reverse }: { data: Memory[]; reverse?: boolean }) => (
    <div className="relative bg-stone-900 py-12 my-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-y-2 border-stone-800 overflow-hidden">
      
      <div className="absolute top-2 left-0 w-full flex justify-around px-2 z-10">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="w-3 h-4 bg-stone-200/20 rounded-sm shrink-0" />
        ))}
      </div>

      <motion.div 
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ 
          duration: 13, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-6 px-4 w-max"
      >
        {data.map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`} 
            className="group relative shrink-0 w-[22vw] min-w-50 aspect-3/4 bg-stone-800 overflow-hidden border-x-4 border-black/50 shadow-2xl"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover grayscale brightness-75 contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 sepia-[0.2]"
            />
            
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

            <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-md">
              <p className="text-[10px] text-pink-400 uppercase font-bold tracking-widest">{item.date}</p>
              <h4 className="text-white text-sm font-serif italic truncate">{item.title}</h4>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-2 left-0 w-full flex justify-around px-2 z-10">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="w-3 h-4 bg-stone-200/20 rounded-sm shrink-0" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex flex-col justify-center overflow-hidden py-20">
      <header className="text-center mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          className="text-3xl md:text-5xl font-serif text-stone-500 uppercase mb-4"
        >
          Memory Reel
        </motion.h2>
        <div className="h-px w-48 bg-linear-to-r from-transparent via-stone-700 to-transparent mx-auto" />
      </header>

      <div className="space-y-4">
        <FilmRow data={row1} />
        <FilmRow data={row2} reverse />
      </div>

      <footer className="text-center text-stone-700 mt-16 text-md tracking-[0.3em] font-mono uppercase">
        Digital Negative // KODAK Safety Film
      </footer>
    </div>
  );
}
"use client";
import {
  Flower,
  GalleryVerticalEnd,
  GiftIcon,
  HomeIcon,
  LucideIcon,
  MessagesSquareIcon,
  PartyPopperIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: GiftIcon, label: "Gifts", href: "/gifts" },
  { icon: MessagesSquareIcon, label: "Messages", href: "/messages" },
  { icon: GalleryVerticalEnd, label: "Memories", href: "/memories" },
  { icon: PartyPopperIcon, label: "Celebrate", href: "/celebrate" },
  { icon: Flower, label: "Florist", href: "/florist" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isVintagePage = pathname === "/memories";
  return (
    <main className="w-full bg-navbar border-t-2 border-medium">
      <nav
        className={`w-full mx-auto px-4 py-4 p-4 transition-colors duration-500 ${
          isVintagePage
            ? "bg-black text-white border-b border-stone-900"
            : ""
        }`}>
        <div className="flex justify-between items-center flex-nowrap w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-col items-center group outline-none pb-4 px-1">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                  <Icon
                    className={`transition-colors md:w-8 md:h-8 w-6 h-6" duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-muted group-hover:text-primary"
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    size={24}
                  />
                  <p
                    className={`text-[10px] sm:text-xs md:text-lg transition-colors duration-300 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted group-hover:text-primary"
                    }`}>
                    {item.label}
                  </p>
                </div>

                {/* THE DOT */}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-900 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
};

export default Navbar;

"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence } from "motion/react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const isDark = theme === "dark";

  //-------------dark mode button---------------
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        className="relative w-10 h-10 overflow-hidden rounded-full"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <AnimatePresence initial={false} mode="sync">
          {isDark ? (
            <motion.span
              initial={{ translateY: 50 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: -50 }}
              key={theme}
              className="absolute"
            >
              <Moon />
            </motion.span>
          ) : (
            <motion.span
              initial={{ translateY: 50 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: -50 }}
              key={theme}
              className="absolute"
            >
              <Sun />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

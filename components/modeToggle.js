"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        className="w-10 h-10 rounded-full "
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {isDark ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <DirectionProvider dir="rtl">{children}</DirectionProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}

import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const vazir = localFont({
  src: [
    {
      path: "./fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata = {
  title: "تورینو",
  description: "برگزار کننده بهترین تور های داخلی و خارجی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" suppressHydrationWarning dir="rtl">
      <body className={`${vazir.variable} font-sans`}>
        <ThemeProvider>
          <Header />
          <Toaster position="top-center" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

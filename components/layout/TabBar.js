"use client";

import { ArrowUpDown, Sunset, User } from "lucide-react";
import { motion } from "motion/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="flex w-full text-[10px] font-bold border-b-2 gap-3 justify-between py-2  my-6 md:hidden sm:justify-start sm:gap-12">
      <div className="relative ">
        {pathname === "/profile" && <AnimateUnderLine />}
        <Link
          href="/profile"
          className={`relative  flex items-center h-full gap-2 ${pathname === "/profile" && "text-primary"}`}
        >
          <User />
          پروفایل
        </Link>
      </div>
      <div className="relative ">
        {pathname === "/profile/tours" && <AnimateUnderLine />}
        <Link
          href="/profile/tours"
          className={`relative  flex items-center h-full gap-2 ${pathname === "/profile/tours" && "text-primary"}`}
        >
          <Sunset />
          تورهای من
        </Link>
      </div>
      <div className="relative ">
        {pathname === "/profile/transactions" && <AnimateUnderLine />}
        <Link
          href="/profile/transactions"
          className={`relative  flex items-center h-full gap-2 ${pathname === "/profile/transactions" && "text-primary"}`}
        >
          <ArrowUpDown />
          تراکنش ها
        </Link>
      </div>
    </div>
  );
}

function AnimateUnderLine() {
  return (
    <motion.span
      initial={{
        height: "150%",
        top: 0,
        borderRadius: 0,
        translateY: -30,
        opacity: 0,
      }}
      animate={{
        height: "2px",
        top: "130%",
        borderRadius: 2,
        translateY: 0,
        opacity: 1,
      }}
      className="absolute w-[110%] bg-primary z-0"
    ></motion.span>
  );
}

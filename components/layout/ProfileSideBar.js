"use client";

import { ArrowUpDown, Sunset, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSideBar() {
  const pathname = usePathname();
  return (
    <div>
      <div className="w-[284px] h-[170px] rounded-[10px] border md:flex flex-col hidden overflow-hidden mt-6 ml-1">
        <div className="relative w-full h-[59px] flex items-center px-3">
          <Link
            href={"/profile"}
            className={`flex gap-2 ${pathname === "/profile" && "text-primary"} z-10`}
          >
            <UserCircle />
            پروفایل
          </Link>
          {pathname === "/profile" && <AnimateBg />}
        </div>
        <div className="relative w-full h-[59px] flex items-center px-3 border-t border-b">
          <Link
            href={"/profile/tours"}
            className={`flex gap-2 ${pathname === "/profile/tours" && "text-primary"} z-10`}
          >
            <Sunset />
            تور های من
          </Link>
          {pathname === "/profile/tours" && <AnimateBg />}
        </div>
        <div className="relative w-full h-[59px] flex items-center px-3">
          <Link
            href={"/profile/transactions"}
            className={`flex gap-2 ${pathname === "/profile/transactions" && "text-primary"} z-10`}
          >
            <ArrowUpDown />
            تراکنش ها
          </Link>
          {pathname === "/profile/transactions" && <AnimateBg />}
        </div>
      </div>
    </div>
  );
}
function AnimateBg() {
  return (
    <motion.span
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.3,
      }}
      transition={{ duration: 1 }}
      className={`z-0 absolute top-0 left-0 w-full h-full animate-in bg-primary`}
    ></motion.span>
  );
}

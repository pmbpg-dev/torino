import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col-reverse items-center w-full p-5 h-[70dvh] justify-evenly md:flex-row">
      <div className="flex flex-col items-center md:justify-between">
        <p className="mb-12 text-2xl md:text-3xl">صفحه مورد نظر یافت نشد!</p>
        <Link
          href="/"
          className="bg-[var(--chart-4)] text-[20px] p-2 md:text-[28px] rounded-2xl text-primary"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <Image src="/images/404.png" width={400} height={400} alt="404.png" />
    </div>
  );
}

export default NotFound;

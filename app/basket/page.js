"use client";
import { Button } from "@/components/ui/button";
import { useUserLoginStatus } from "@/core/hooks/useUserLoginStatus";
import { getBasket } from "@/core/services/configs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Order() {
  const { data } = useQuery({
    queryKey: ["getTourBasketNum"],
    queryFn: async () => await getBasket(),
  });
  if (!data)
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center relative md:flex-row md:items-start md:mt-6 md:justify-between md:px-8">
        <p className="absolute text-xl top-20 md:static">
          سبد خرید خالی شما است.
        </p>
        <Link href={"/"} className="text-primary">
          لیست تور ها ←
        </Link>
      </div>
    );
  return (
    <div className="w-full h-[70vh] flex flex-col items-center">
      {data?.data && (
        <div className="flex items-center justify-between w-full h-16 gap-3 px-6 border-2 border-dashed rounded-xl bg-card">
          <p className="flex items-center justify-center h-full pl-3 border-l-2 border-dashed text-[12px] md:text-xl">
            تور مسافرتی - {data?.data.data.title}
          </p>
          <Button>پرداخت</Button>
        </div>
      )}
    </div>
  );
}

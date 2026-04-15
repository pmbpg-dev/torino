"use client";

import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="overflow-hidden border rounded-lg bg-card w-[300px]">
      <Skeleton className={"w-full h-[170px] !rounded-none"} />
      <Skeleton className={"w-[70px] h-5 mt-2 mr-2"} />
      <Skeleton className={"w-[100px] h-3 my-3 mr-4"} />
      <div className="flex items-center justify-between w-full p-2 border-t">
        <Skeleton className="px-8 h-[30px] w-[83px] " />
        <Skeleton className="w-[60px] h-3" />
      </div>
    </div>
  );
}

export default SkeletonCard;

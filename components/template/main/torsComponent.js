"use client";

import { useEffect, useState } from "react";
import Search from "./search";
import { useQuery } from "@tanstack/react-query";
import { getTors } from "@/core/services/configs";
import { useSearchParams } from "next/navigation";
import Card from "./card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";

function TorsComponent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.toString());
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["tours", query],
    queryFn: () => getTors(query),
  });
  const tours = data?.data;

  return (
    <article className="flex flex-col flex-wrap items-center w-full gap-2 ">
      <Search onSearch={setQuery} />
      <h3 className=" text-[32px] mt-12 mb-4 w-full px-5 text-center md:text-right md:w-[85%] border-b pb-4">
        {query ? "تور های فیلتر شده" : "همه تور ها"}
      </h3>
      <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-3 lg:grid-cols-4">
        {tours && tours.map((tour) => <Card data={tour} key={tour.id} />)}
        {isLoading && (
          <>
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
            <Skeleton className="w-[300px] h-[308px]" />
          </>
        )}
      </div>
      {!isLoading && tours.length === 0 ? (
        <div className="w-full h-[40dvh] flex items-center justify-center text-3xl">
          <SearchX className="w-12" />
          <p>موردی یافت نشد</p>
        </div>
      ) : null}
    </article>
  );
}

export default TorsComponent;

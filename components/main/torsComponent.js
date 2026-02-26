"use client";

import { useEffect, useState } from "react";
import Search from "./search";
import { useQuery } from "@tanstack/react-query";
import { getTors } from "@/core/services/configs";
import { useSearchParams } from "next/navigation";
import Card from "./card";

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
  return (
    <article className="flex flex-col flex-wrap items-center w-full gap-2 ">
      <Search onSearch={setQuery} />
      <h3 className=" text-right text-[32px] mt-12 mb-2">
        {query ? "تور های فیلتر شده" : "همه تور ها"}
      </h3>
      <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-3 lg:grid-cols-4">
        {data && data.data.map((tour) => <Card data={tour} key={tour.id} />)}
      </div>
    </article>
  );
}

export default TorsComponent;

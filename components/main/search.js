"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DatePicker } from "zaman";
import SelectCity from "../DropDown/selectCity";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Search({ onSearch }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [dateRange, setDateRange] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await axios.get("/api/tours/cities");
      return res.data;
    },
  });

  useEffect(() => {
    setOriginId(searchParams.get("originId"));
    setDestinationId(searchParams.get("destinationId"));
    setDateRange(searchParams.get("dateRange"));
  }, []);

  const searchHandler = () => {
    const params = new URLSearchParams();

    if (destinationId) params.set("destinationId", destinationId);
    if (originId) params.set("originId", originId);

    if (dateRange?.from && dateRange?.to) {
      params.set("startDate", dateRange.from.toISOString());
      params.set("endDate", dateRange.to.toISOString());
    }

    const queryString = params.toString();
    onSearch(queryString);
    router.push(`/?${queryString}`);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 md:border md:flex-row w-[100vw] md:w-[70vw] md:h-[71px] rounded-[20px]">
      <div className="flex w-full gap-2 md:justify-start md:w-1/2">
        <SelectCity
          value={originId}
          onChange={setOriginId}
          cities={data}
          placeHolder="مبدا"
        />
        <SelectCity
          value={destinationId}
          onChange={setDestinationId}
          cities={data}
          placeHolder="مقصد"
        />
      </div>
      <DatePicker
        accentColor="#28a745"
        range
        placeholder="تاریخ"
        onChange={(range) => setDateRange(range)}
      />
      <Button className="w-full h-full md:w-1/4" onClick={searchHandler}>
        جستجو
      </Button>
    </div>
  );
}

export default Search;

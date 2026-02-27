"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DatePicker } from "zaman";
import SelectCity from "@/components/DropDown/selectCity";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Earth, MapPin } from "lucide-react";

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
    const origin = searchParams.get("originId");
    const destination = searchParams.get("destinationId");
    const date = searchParams.get("dateRange");
    if (origin) setOriginId(origin);
    if (destination) setDestinationId(destination);
    if (date) setDateRange(date);
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
    <div className="flex flex-col items-center justify-evenly p-4 md:border-2 md:flex-row w-[100vw] md:w-[70vw] md:h-[71px] rounded-[20px] gap-3 md:gap-0">
      <div className="flex w-full gap-2 md:justify-between md:w-1/2 md:gap-0 ">
        <div className="relative flex items-center justify-start w-2/4 h-full px-3 border-2 rounded-[12px] md:border-none">
          <MapPin />
          <SelectCity
            value={originId}
            onChange={setOriginId}
            cities={data}
            placeHolder="مبدا"
          />
          {originId && (
            <button
              onClick={() => setOriginId("")}
              className="absolute left-4 md:left-6"
            >
              ✕
            </button>
          )}
        </div>
        <div className="relative flex items-center justify-start w-2/4 h-full px-3 border-2 rounded-[12px] md:border-none">
          <Earth />
          <SelectCity
            value={destinationId}
            onChange={setDestinationId}
            cities={data}
            placeHolder="مقصد"
          />
          {destinationId && (
            <button
              onClick={() => setDestinationId("")}
              className="absolute left-4 md:left-6 "
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full md:w-1/4 md:h-full h-[48px] border-2 rounded-[12px] md:border-none">
        <CalendarDays />
        <DatePicker
          accentColor="#28a745"
          range
          onChange={(range) => setDateRange(range)}
          inputClass="md:w-full h-full bg-background text-[12px] outline-none"
        />
        {!dateRange && (
          <span className="absolute text-sm pointer-events-none text-muted-foreground md:right-7 md:top-2">
            تاریخ
          </span>
        )}
      </div>
      <Button
        className="w-full h-[48px] md:h-full md:w-1/4 rounded-[12px]"
        onClick={searchHandler}
      >
        جستجو
      </Button>
    </div>
  );
}

export default Search;

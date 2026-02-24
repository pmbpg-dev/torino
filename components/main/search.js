"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DatePicker } from "zaman";
import SelectCity from "../DropDown/selectCity";
import { Button } from "../ui/button";

function Search() {
  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await axios.get("/api/tours/cities");
      return res.data;
    },
  });
  return (
    <div>
      <div className="flex">
        {data && (
          <>
            <SelectCity cities={data} placeHolder="مبدا" />
            <SelectCity cities={data} placeHolder="مقصد" />
          </>
        )}
      </div>
      <DatePicker accentColor="#28a745" range />
      <Button>جستجو</Button>
    </div>
  );
}

export default Search;

"use client";

import { MapPin } from "lucide-react";

import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";

function SelectCity({ cities, placeHolder, value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex justify-between">
            {placeHolder}
          </SelectLabel>
          {(cities || []).map((city) => (
            <SelectItem key={city.id} value={city.id}>
              {city.faName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCity;

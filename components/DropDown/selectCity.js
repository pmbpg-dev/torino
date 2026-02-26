"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

function SelectCity({ cities, placeHolder, value, onChange }) {
  return (
    <Select className="border-none" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex justify-between">
            {placeHolder}
            {value && <button onClick={() => onChange("")}>✕</button>}
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

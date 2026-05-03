"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const gender = ["male", "female"];

export default function SelectGender({ field, fieldState }) {
  const [selected, setSelected] = useState("");
  return (
    <Select
      {...field}
      onValueChange={(value) => {
        field.onChange(value);
      }}
    >
      <SelectTrigger className="!border !rounded-sm max-w-[285px]">
        <SelectValue placeholder={"جنسیت"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex justify-between">جنسیت</SelectLabel>
          <SelectItem value={gender[0]}>مرد</SelectItem>
          <SelectItem value={gender[1]}>زن</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

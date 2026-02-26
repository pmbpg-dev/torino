"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { toPersianDigits } from "@/core/helper/convertNumber";

function Card({ data }) {
  return (
    <div className="overflow-hidden border rounded-lg bg-card">
      <Image
        src={data.image}
        width={300}
        height={300}
        alt={data.title}
        className="transition  hover:scale-105 hover:translate-y-[-5px]"
      />
      <p className="text-[22px] mt-2 mr-2">{data.title}</p>
      <p>...</p>
      <div className="flex justify-between w-full p-2 border-t">
        <Button>رزرو</Button>
        <p>
          {data.price}
          <span>تومان</span>
        </p>
      </div>
    </div>
  );
}

export default Card;

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { useRouter } from "next/navigation";
import { jalalidate } from "@/core/helper/convertDate";
import { calculateDays } from "@/core/helper/calculateDays";

function Card({ data }) {
  const navigate = useRouter();
  const dates = jalalidate(data.startDate, data.endDate);
  const day = calculateDays(data.startDate, data.endDate);
  return (
    <div className="overflow-hidden border rounded-lg bg-card">
      <Image
        src={data.image}
        width={300}
        height={300}
        alt={data.title}
        className="transition  hover:scale-105 hover:translate-y-[-5px]"
      />
      <p className="text-[22px] mt-2 mr-2 font-bold">{data.title}</p>
      <p className="my-3 mr-4 text-muted-foreground">{`${dates[2]} ماه. ${toPersianDigits(day)}روزه `}</p>
      <div className="flex justify-between w-full p-2 border-t">
        <Button
          onClick={() => navigate.push(`tours/${data.id}`)}
          className="px-8 h-[30px] "
        >
          رزرو
        </Button>
        <p className="text-[16px] text-[var(--price)]">
          {toPersianDigits(data.price.toLocaleString())}
          <span className="text-[12px] text-muted-foreground mr-2">تومان</span>
        </p>
      </div>
    </div>
  );
}

export default Card;

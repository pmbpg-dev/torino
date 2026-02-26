import { calculateDays } from "@/core/helper/calculateDays";
import { cityFaMap } from "@/core/helper/cityList";
import { jalalidate } from "@/core/helper/convertDate";
import { toPersianDigits } from "@/core/helper/convertNumber";

import {
  BusFront,
  CalendarArrowDown,
  CalendarArrowUp,
  CircleStar,
  Map,
  Route,
  ShieldBan,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function TourDetails({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/tour/${params.tourId}`,
    {
      next: { revalidate: 5 * 60 },
    },
  );
  if (!res.ok) return notFound();
  const data = await res.json();
  console.log(data);
  const day = calculateDays(data.startDate, data.endDate);
  const dates = jalalidate(data.startDate, data.endDate);

  return (
    <div>
      <div>
        <Image src={data.image} width={400} height={400} alt={data.title} />
        <div>
          <div>
            <h4>{data.title}</h4>
            <p>{`${toPersianDigits(String(day))} روز و ${toPersianDigits(String(day - 1))}شب`}</p>
          </div>
          <div>
            <p>
              <UserRoundCheck /> تورلیدر از مبدا
            </p>
            <p>
              <Map />
              برنامه سفر
            </p>
            <p>
              <CircleStar />
              تضمین کیفیت
            </p>
          </div>
          <div>
            <div>
              <span>
                <Route />
                مبدا
              </span>
              <p>{cityFaMap[data.origin.id]}</p>
            </div>
            <div>
              <span>
                <CalendarArrowUp />
                تاریخ رفت
              </span>
              <p>{dates[0]}</p>
            </div>
            <div>
              <span>
                <CalendarArrowDown />
                تاریخ برگشت
              </span>
              <p>{dates[1]}</p>
            </div>
            <div>
              <span>
                <BusFront />
              </span>
              <p></p>
            </div>
            <div>
              <span>
                <Users />
              </span>
              <p></p>
            </div>
            <div>
              <span>
                <ShieldBan />
              </span>
              <p></p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

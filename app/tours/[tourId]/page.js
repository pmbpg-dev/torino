import { calculateDays } from "@/core/helper/calculateDays";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { CircleStar, Map, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import css from "./tourDetails.module.css";
import InfoTour from "@/components/template/infoTour";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex items-center justify-center w-full p-3 bg-card md:bg-background lg:px-14">
      <div className="w-full bg-card rounded-[10px] md:border-2 md:py-3">
        <div className="flex flex-col w-full p-4 md:flex-row ">
          <Image
            src={data.image}
            width={400}
            height={400}
            alt={data.title}
            className="rounded-[12px] w-full md:w-[600px] lg:w-[800px]"
          />
          <div className="flex flex-col items-center w-full md:items-start md:px-4">
            <div className="flex justify-between w-full my-6 lg:flex-col lg:gap-5">
              <h4 className="text-2xl font-bold">{data.title}</h4>
              <p>{`${toPersianDigits(day)} روز و ${toPersianDigits(String(day - 1))}شب`}</p>
            </div>
            <div className="flex justify-between w-full text-[13px]  md:justify-start mb-12 text-muted-foreground md:gap-8">
              <p className="flex gap-2">
                <UserRoundCheck /> تورلیدر از مبدا
              </p>
              <p className="flex gap-2">
                <Map />
                برنامه سفر
              </p>
              <p className="flex gap-2">
                <CircleStar />
                تضمین کیفیت
              </p>
            </div>
            <div className="flex flex-wrap justify-center w-full gap-2 md:hidden">
              <InfoTour data={data} />
            </div>
            <div className="flex justify-between w-full pt-4 mt-8 border-t-2 md:flex-row-reverse md:border-none md:w-full">
              <Button className="px-9 py-5 text-[20px]">رزرو خرید</Button>
              <p className="text-[24px] text-[var(--price)]">
                {toPersianDigits(data.price.toLocaleString())}{" "}
                <span className="text-[12px] text-muted-foreground">تومان</span>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden justify-evenly md:flex">
          <InfoTour data={data} />
        </div>
      </div>
    </div>
  );
}

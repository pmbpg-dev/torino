"use client";

import { vehicles } from "@/core/data/vehicles";
import { cityFaMap } from "@/core/helper/cityList";
import { jalalidate } from "@/core/helper/convertDate";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { getTourStatus } from "@/core/helper/getTourStatus";
import {
  BusFront,
  CarFront,
  Plane,
  Ship,
  Sunset,
  Train,
  Van,
} from "lucide-react";

export default function UserTourCard({ tour, index }) {
  const {
    title,
    fleetVehicle,
    destination,
    origin,
    endDate,
    startDate,
    price,
  } = tour;

  const dates = jalalidate(startDate, endDate);

  const status = getTourStatus(startDate, endDate);

  const statusClass =
    status.status === "upcoming"
      ? "bg-yellow-600"
      : status.status === "ongoing"
        ? "bg-primary"
        : "bg-destructive";

  const vehicle = vehicles[fleetVehicle];
  const VehicleIcon = vehicle?.icon || CarFront;

  return (
    <div className="w-full border rounded-sm bg-card md:bg-background">
      <div className="relative w-full p-3">
        <div className="flex gap-5 sm:gap-16 sm:justify-between md:justify-start lg:justify-between">
          <p className="flex gap-2 text-[12px] items-center lg:text-sm">
            <Sunset width={18} />
            {title}
          </p>
          <p className="flex gap-2 text-[12px] items-center lg:text-sm">
            <VehicleIcon width={18} />
            {vehicle?.label || "سواری"}
          </p>
          <span
            className={`absolute px-2 py-1 rounded-full left-1 top-1 ${statusClass} text-[8px] sm:static md:absolute lg:static lg:text-[14px] text-white opacity-55`}
          >
            {status.label}
          </span>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-4 mt-5 md:justify-between lg:justify-start">
          <div className="flex items-center justify-between w-full gap-2 sm:w-2/5 sm:justify-start md:w-full md:justify-between lg:justify-start lg:w-2/5 ">
            <p className="text-sm font-bold">{`${cityFaMap[origin.id]} به ${cityFaMap[destination.id]}`}</p>
            <span className="opacity-50 text-[12px] lg:text-sm">
              • {dates[0]}
            </span>
          </div>
          <div className="flex items-center justify-between w-full gap-2 sm:w-2/5 sm:justify-start md:w-full md:justify-between lg:justify-start lg:w-2/5 ">
            <p className="text-sm font-bold">تاریخ برگشت</p>
            <span className="opacity-50 text-[12px] lg:text-sm">
              • {dates[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full gap-2 p-3 border-t">
        <div className="flex items-center gap-1 pl-2 border-l">
          <span className="opacity-50 text-[10px] md:text-sm">شماره تور</span>
          <p className="text-sm">{toPersianDigits(index + 1 * 156266)}</p>
        </div>
        <div className="flex items-center">
          <span className="opacity-50 text-[10px] md:text-sm ml-2">
            شماره تور
          </span>
          <p>{toPersianDigits(price.toLocaleString())}</p>
          <span className="opacity-50 text-[10px] md:text-sm">تومان</span>
        </div>
      </div>
    </div>
  );
}

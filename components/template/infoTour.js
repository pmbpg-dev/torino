import { cityFaMap } from "@/core/helper/cityList";
import { jalalidate } from "@/core/helper/convertDate";
import { toPersianDigits } from "@/core/helper/convertNumber";
import {
  BusFront,
  CalendarArrowDown,
  CalendarArrowUp,
  Route,
  ShieldBan,
  Users,
} from "lucide-react";

const vehicles = {
  SUV: "سواری",
  Bus: "اتوبوس",
  Van: "ون",
  Airplane: "هواپیما",
};

function InfoTour({ data }) {
  const dates = jalalidate(data.startDate, data.endDate);

  return (
    <>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-l-2 md:border-0 md:pl-8">
        <span className="flex gap-2">
          <Route />
          مبدا
        </span>
        <p>{cityFaMap[data.origin.id]}</p>
      </div>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-l-2 md:border-0 md:pl-8">
        <span className="flex gap-2">
          <CalendarArrowUp />
          تاریخ رفت
        </span>
        <p>{dates[0]}</p>
      </div>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-l-2 md:border-0 md:pl-8">
        <span className="flex gap-2">
          <CalendarArrowDown />
          تاریخ برگشت
        </span>
        <p>{dates[1]}</p>
      </div>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-l-2 md:border-0 md:pl-8">
        <span className="flex gap-2">
          <BusFront />
          حمل و نقل
        </span>
        <p>{vehicles[data.fleetVehicle]}</p>
      </div>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-l-2 md:border-0 md:pl-8">
        <span className="flex gap-2">
          <Users />
          ظرفیت
        </span>
        <p>{`حداکثر ${toPersianDigits(data.availableSeats)} نفر`}</p>
      </div>
      <div className="flex flex-col items-center justify-between p-2 h-[80px] border rounded md:mb-4 md:border-none ">
        <span className="flex gap-2">
          <ShieldBan />
          بیمه
        </span>
        <p>{data.insurance ? "دارد" : "ندارد"}</p>
      </div>
    </>
  );
}

export default InfoTour;

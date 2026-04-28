"use client";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { CircleStar, Map, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import InfoTour from "@/components/template/tourDetails/infoTour";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addToBasket } from "@/core/services/configs";

function TourCardDetails({ tour, day, tourId }) {
  const navigate = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["addToBasket"],
    mutationFn: (id) => addToBasket(id),
    onSuccess: (data) => {
      if (data.error) return toast.warning(data.message);
      toast.success(data.message);
      // navigate.push("/profile");
    },
    onError: (err) => {
      toast.warning("برای رزرو باید وارد حساب کاربری شوید!");
    },
  });

  const reserveTourHandler = () => {
    mutate(tourId);
  };

  return (
    <div className="w-full bg-card rounded-[10px] md:border-2 md:py-3">
      <div className="flex flex-col w-full p-4 md:flex-row ">
        <Image
          src={tour.image}
          width={400}
          height={400}
          alt={tour.title}
          className="rounded-[12px] w-full md:w-[600px] lg:w-[800px]"
        />
        <div className="flex flex-col items-center w-full md:items-start md:px-4">
          <div className="flex justify-between w-full my-6 lg:flex-col lg:gap-5">
            <h4 className="text-2xl font-bold">{tour.title}</h4>
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
          <div className="flex flex-wrap justify-start w-full gap-2 md:hidden">
            <InfoTour data={tour} />
          </div>
          <div className="flex justify-between w-full pt-4 mt-8 border-t-2 md:flex-row-reverse md:border-none md:w-full">
            <Button
              className="px-9 py-5 text-[20px]"
              onClick={reserveTourHandler}
            >
              رزرو و خرید
            </Button>
            <p className="text-[24px] text-[var(--price)]">
              {toPersianDigits(tour.price.toLocaleString())}{" "}
              <span className="text-[12px] text-muted-foreground">تومان</span>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden justify-evenly md:flex">
        <InfoTour data={tour} />
      </div>
    </div>
  );
}

export default TourCardDetails;

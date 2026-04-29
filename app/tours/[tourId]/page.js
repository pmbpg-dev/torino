import { calculateDays } from "@/core/helper/calculateDays";
import { notFound } from "next/navigation";
import BackButton from "@/components/template/tourDetails/backButton";
import TourCardDetails from "@/components/template/tourDetails/tourCardDetails";

export async function generateMetadata({ params }) {
  const { tourId } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/tour/${tourId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        title: "تور یافت نشد",
        description: "تور مورد نظر شما در دسترس نیست.",
      };
    }

    const data = await res.json();

    return {
      title: data?.title,
      description: "صفحه جزئیات تور مسافرتی انتخاب شده",
    };
  } catch (err) {
    return {
      title: "خطا در دریافت تور",
      description: "در حال حاضر اطلاعات تور در دسترس نیست.",
    };
  }
}

export default async function TourDetails({ params }) {
  const { tourId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/tour/${tourId}`, {
    next: { revalidate: 5 * 60 },
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  const day = calculateDays(data.startDate, data.endDate);

  return (
    <div className="relative flex flex-col items-end justify-center w-full gap-4 p-3 pb-14 md:bg-background bg-card lg:px-14">
      <BackButton />
      <TourCardDetails tour={data} day={day} tourId={tourId} />
    </div>
  );
}

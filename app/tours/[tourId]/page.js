import { calculateDays } from "@/core/helper/calculateDays";
import { notFound } from "next/navigation";
import BackButton from "@/components/template/tourDetails/backButton";
import TourCardDetails from "@/components/template/tourDetails/tourCardDetails";

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

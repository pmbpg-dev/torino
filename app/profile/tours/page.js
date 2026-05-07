"use client";
import LoadingPage from "@/components/layout/LoadingPage";
import Empty from "@/components/template/allPage/Empty";
import UserTourCard from "@/components/template/profile/tours/UserTourCard";
import { getUserTour } from "@/core/services/configs";
import { useQuery } from "@tanstack/react-query";

// export const metadata = {
//   title: "تورهای من",
//   description: "صفحه حساب کاربری",
// };
export default function ProfileTours() {
  const { data, isFetching } = useQuery({
    queryKey: ["user_tours"],
    queryFn: () => getUserTour(),
  });
  // console.log(data.data.length);

  if (isFetching)
    return (
      <div className="flex flex-col w-full gap-5 p-5 mr-5 mt-6 border rounded-[10px] min-h-[70dvh]">
        <LoadingPage />
      </div>
    );
  if (!data?.data.length)
    return (
      <div className="flex flex-col w-full gap-5 p-5 mr-5 mt-6 border rounded-[10px] min-h-[70dvh]">
        <Empty />
      </div>
    );
  return (
    <div className="flex flex-col w-full gap-5 md:p-3 md:p-5 mt-6 md:border rounded-[10px] min-h-[70dvh]">
      {data?.data.map((tour, index) => (
        <UserTourCard key={tour.id} tour={tour} index={index} />
      ))}
    </div>
  );
}

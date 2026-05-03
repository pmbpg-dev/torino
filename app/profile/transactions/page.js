"use client";

import LoadingPage from "@/components/layout/LoadingPage";
import { Spinner } from "@/components/ui/spinner";
import { convertTimeDate } from "@/core/helper/convertDate";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { getTransactions } from "@/core/services/configs";
import { useQuery } from "@tanstack/react-query";

export default function Transactions() {
  const { data, isLoading } = useQuery({
    queryKey: ["getTransactions"],
    queryFn: async () => await getTransactions(),
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex items-center justify-center w-full mt-6">
      <div className="border-2 rounded-[10px] w-full max-w-4xl h-[50vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-around w-full h-12 bg-border text-[12px] md:font-bold ">
          <p className="flex-1 text-center">تاریخ و ساعت</p>
          <p className="flex-1 text-center">مبلغ (تومان)</p>
          <p className="hidden text-center md:block md:flex-1">نوع تراکنش</p>
          <p className="flex-1 text-center">شماره سفارش</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {data?.data.map((tr, index) => (
            <div
              key={tr.id}
              className="flex items-center justify-around w-full h-14 text-[12px] opacity-85 py-2"
            >
              <p className="flex-1 text-center text-[10px]">
                {convertTimeDate(tr.createdAt)}
              </p>
              <p className="flex-1 text-center">
                {toPersianDigits(tr.amount.toLocaleString())}
              </p>
              <p className="hidden text-center md:block md:flex-1">
                ثبت نام در تور گردشگری
              </p>
              <p className="flex-1 text-center">{index + 1 * 156266}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

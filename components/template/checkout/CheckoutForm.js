"use client";

import { Input } from "@/components/ui/input";
import { Calendar, UserPen } from "lucide-react";
import { DatePicker } from "zaman";
import SelectGender from "../DropDown/selectGender";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { orderPay } from "@/core/services/configs";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationTraveler } from "@/core/helper/schemaForm";
import { toast } from "sonner";
import { calculateDays } from "@/core/helper/calculateDays";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { useRouter } from "next/navigation";

function CheckoutForm({ data }) {
  const day = calculateDays(data.startDate, data.endDate);
  const price = toPersianDigits(data.price.toLocaleString());
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationTraveler),
  });

  const { mutate } = useMutation({
    mutationKey: ["order"],
    mutationFn: (data) => orderPay(data),
    onSuccess: () => {
      toast.success("تور با موفقیت خریداری شد.");
      // navigate.push(`/tours/${data.id}`);
      navigate.push(`/basket`);
    },
    onError: (err) => toast.error("در خرید تور بها مشکل مواجه شدید!"),
  });
  const onSubmit = (formatData) => {
    mutate(formatData);
  };
  return (
    <div className="flex flex-col items-center w-full gap-2 p-5 lg:flex-row md:h-[80dvh] lg:items-start">
      <div className=" border rounded-[10px] p-3 bg-card flex flex-col gap-6">
        <p className="flex gap-2 text-2xl">
          <UserPen />
          مشخصات مسافر
        </p>
        <form
          id="travelerForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-center gap-4 md:justify-start"
        >
          <div className="w-[285px] h-[75px]">
            <Input
              placeholder="نام ونام خانوادگی"
              {...register("fullName")}
              className="max-w-[285px] h-[50px] rounded-sm"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div className="w-[285px] h-[75px]">
                <SelectGender field={field} />
                {errors.gender && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="w-[285px] h-[75px]">
            <Input
              placeholder="کد ملی"
              {...register("nationalCode")}
              className="w-full h-[50px] !border"
            />
            {errors.nationalCode && (
              <p className="mt-1 text-sm text-destructive">
                {errors.nationalCode.message}
              </p>
            )}
          </div>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <div className="relative w-[285px] h-[75px]">
                {!field.value && (
                  <span className="absolute flex gap-2 opacity-60 right-3 top-3">
                    <Calendar width={18} />
                    تاریخ تولد
                  </span>
                )}
                <DatePicker
                  accentColor="#28a745"
                  onChange={(e) =>
                    field.onChange(e.value.toISOString().split("T")[0])
                  }
                  customShowDateFormat="YYYY/MM/DD"
                  inputClass=" bg-card border w-full !h-[50px] p-2 rounded-sm"
                />
                {errors.birthDate && (
                  <p className="mt-1 mb-2 text-sm text-destructive">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            )}
          />
        </form>
      </div>
      <div className="w-full lg:w-[325px] bg-card rounded-[10px] h-[247px] border px-4 pb-4 flex-col flex justify-between">
        <div className="flex items-center justify-between gap-2 py-4 border-b-2 border-dashed h-1/2">
          <p className="text-2xl">{data.title}</p>
          <span className="opacity-50 ">{`${toPersianDigits(day)} روز و ${toPersianDigits(day - 1)} شب`}</span>
        </div>
        <div className="flex justify-between py-4">
          <p className="opacity-70 "> قیمت نهایی</p>
          <p>
            <span className="text-[var(--price)] text-2xl">{price}</span>
            <span className="text-xs opacity-50">تومان</span>
          </p>
        </div>
        <Button
          type="submit"
          form="travelerForm"
          disabled={!isDirty || isSubmitting}
          className="w-full"
        >
          ثبت و خرید نهایی
        </Button>
      </div>
    </div>
  );
}

export default CheckoutForm;

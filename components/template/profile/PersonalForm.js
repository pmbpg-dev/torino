"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertBirthDate } from "@/core/helper/convertDate";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { validationTraveler } from "@/core/helper/schemaForm";
import { Calendar, PenLine } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import SelectGender from "../DropDown/selectGender";
import { DatePicker } from "zaman";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PersonalForm({
  profileData,
  mutate,
  isOpen,
  setIsOpen,
}) {
  const { firstName, lastName, gender, birthDate, nationalCode } = profileData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationTraveler),
  });

  const onSubmit = (data) => {
    const [firstName, ...lastName] = data.fullName.trim().split(" ");
    const date = data.birthDate;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const birthString = `${y}/${m}/${d}`;
    const payload = {
      firstName,
      lastName: lastName.join(" "),
      birthDate: birthString,
      gender: data.gender,
      nationalCode: data.nationalCode,
    };

    mutate(payload);
  };

  return (
    <div className="w-full border rounded-[10px] p-5">
      <div
        className={`w-full flex ${!isOpen && "justify-between"} items-center mb-10`}
      >
        <p>{`${isOpen ? "ویرایش" : ""} اطلاعات شخصی`}</p>
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className=" !bg-transparent shadow-none text-[var(--price)] font-bold"
          >
            <PenLine />
            ویرایش اطلاعات
          </Button>
        )}
      </div>
      {!isOpen ? (
        <div className="flex flex-col flex-wrap justify-between w-full gap-2 gap-y-10 sm:flex-row">
          <div className="flex justify-between w-full lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">نام و نام خانوادگی</span>
            <p>{lastName && firstName ? `${firstName} ${lastName}` : "—"}</p>
          </div>
          <div className="flex justify-between w-full lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">کدملی</span>
            <p>{nationalCode ? toPersianDigits(nationalCode) : "—"}</p>
          </div>
          <div className="flex justify-between w-full mb-7 lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">جنسیت</span>
            <p>{gender ? (gender === "male" ? "مرد" : "زن") : "—"}</p>
          </div>
          <div className="flex justify-between w-full mb-7 lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">تاریخ تولد</span>
            <p>{birthDate ? convertBirthDate(birthDate) : "—"}</p>
          </div>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="personalForm"
            className="flex flex-wrap gap-x-10"
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
                    inputClass=" bg-background border w-full !h-[50px] p-2 rounded-sm"
                  />
                  {errors.birthDate && (
                    <p className="mt-1 mb-2 text-sm text-destructive">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
              )}
            />
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
          </form>
          <div className="flex justify-between w-full gap-4 pt-3 sm:justify-end sm:border-t">
            <Button
              type="submit"
              form="personalForm"
              className="w-[100px] h-10"
            >
              تایید
            </Button>
            <Button
              className="w-[100px] h-10"
              variant="cancel"
              onClick={() => setIsOpen(false)}
            >
              انصراف
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

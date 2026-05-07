"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { emailSchema } from "@/core/helper/schemaForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";

function AccountForm({ profileData, mutate, isOpen, setIsOpen }) {
  const { email, mobile } = profileData;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({ resolver: yupResolver(emailSchema) });

  const onSubmit = (data) => {
    const newData = { ...profileData, ...data };
    mutate(newData);
  };

  return (
    <div className="w-full border rounded-[10px] p-5">
      <p className="mb-3 font-bold">اطلاعات حساب کاربری</p>
      <div className="flex flex-col items-center w-full gap-4 lg:flex-row">
        <div className="flex justify-between w-full sm:justify-normal sm:gap-4">
          <span className="opacity-60">شماره موبایل</span>
          <p>{toPersianDigits(mobile)}</p>
        </div>
        {!isOpen ? (
          <div className="flex flex-wrap justify-between w-full gap-3">
            <div className="flex gap-4">
              <span className="opacity-60">ایمیل</span>
              <p>{email ? email : "—"}</p>
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              className=" !bg-transparent shadow-none text-[var(--price)] font-bold"
            >
              <PenLine />
              افزودن
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-end w-full gap-3"
          >
            <div>
              <Input
                placeholder="آدرس ایمیل"
                {...register("email")}
                className="max-w-[188px] h-10"
              />
              {errors.email && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button
              disabled={!isDirty || isSubmitting}
              type="submit"
              className="w-[93px] h-10"
            >
              تایید
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AccountForm;

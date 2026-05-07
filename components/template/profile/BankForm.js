import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { bankSchema } from "@/core/helper/schemaForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBankByCardNumber } from "iran-bank-detector";
import { PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function BankForm({ profileData, mutate, isOpen, setIsOpen }) {
  const {
    payment: { shaba_code, debitCard_code, accountIdentifier },
  } = profileData;
  const [bankName, setBankName] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(bankSchema),
  });

  const onSubmit = (payment) => {
    const bankData = { payment };
    const newData = { ...profileData, ...bankData };
    mutate(newData);
  };

  useEffect(() => {
    const name = getBankByCardNumber(debitCard_code)?.bankName;
    setBankName(name ? name : "");
  }, [debitCard_code]);

  return (
    <div className="w-full border rounded-[10px] p-5">
      <div
        className={`w-full flex ${!isOpen && "justify-between"} items-center mb-10`}
      >
        <p>{`${isOpen ? "ویرایش" : ""} اطلاعات حساب بانکی ${!isOpen ? (debitCard_code ? bankName : "") : ""}`}</p>

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
            <span className="opacity-60">شماره کارت</span>
            <p>{debitCard_code ? toPersianDigits(debitCard_code) : "—"}</p>
          </div>
          <div className="flex justify-between w-full lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">شماره حساب</span>
            <p>
              {accountIdentifier ? toPersianDigits(accountIdentifier) : "—"}
            </p>
          </div>
          <div className="flex justify-between w-full lg:w-2/5 sm:justify-normal sm:gap-4">
            <span className="opacity-60">شماره شبا</span>
            <p>{shaba_code ? toPersianDigits(shaba_code) : "—"}</p>
          </div>
        </div>
      ) : (
        <>
          <form
            id="bankForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap gap-x-10"
          >
            <div className="w-[285px] h-[75px]">
              <Input
                placeholder="شماره کارت"
                {...register("debitCard_code")}
                className="max-w-[285px] h-[50px] rounded-sm"
              />
              {errors.debitCard_code && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.debitCard_code.message}
                </p>
              )}
            </div>
            <div className="w-[285px] h-[75px]">
              <Input
                placeholder="شماره حساب"
                {...register("accountIdentifier")}
                className="max-w-[285px] h-[50px] rounded-sm"
              />
              {errors.accountIdentifier && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.accountIdentifier.message}
                </p>
              )}
            </div>
            <div className="w-[285px] h-[75px]">
              <Input
                placeholder="شماره شبا"
                {...register("shaba_code")}
                className="max-w-[285px] h-[50px] rounded-sm"
              />
              {errors.shaba_code && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.shaba_code.message}
                </p>
              )}
            </div>
          </form>
          <div className="flex justify-between w-full gap-4 pt-3 sm:justify-end sm:border-t">
            <Button type="submit" form="bankForm" className="w-[100px] h-10">
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

export default BankForm;

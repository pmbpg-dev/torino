"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import css from "./Module.module.css";
import { motion } from "motion/react";
import { ArrowLeft, X } from "lucide-react";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneSchema } from "@/helper/schemaForm";
import { toEnglishDigits, toPersianDigits } from "@/helper/convertNumber";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "@/services/configs";
import { toast } from "sonner";

function Module({ setShow }) {
  const [step, setStep] = useState(1);
  //   ---------------react-hook-form-----------------
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(phoneSchema) });
  //---------------get OTP code ------------------
  const { mutate } = useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: (phone) => sendOTP(phone),
    onSuccess: (data) => {
      setStep(2);
      toast.success("کد اعتبار سنجی", {
        description: `${toPersianDigits(data.code)}`,
        action: {
          label: "وارد کردن",
          onClick: () => console.log(data.code),
        },
      });
    },
  });
  const sendCode = (data) => mutate(data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={css.container}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          translateY: "100%",
        }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.1,
        }}
        className={css.box}
        key="box"
      >
        {step === 1 ? (
          <X onClick={() => setShow(false)} />
        ) : (
          <ArrowLeft onClick={() => setStep(1)} />
        )}

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            key={"step1"}
          >
            <p className="text-[28px] font-bold">ورود به تورینو</p>
            <form onSubmit={handleSubmit(sendCode)}>
              <label htmlFor="input-mobile">
                شماره موبایل خود را وارد کنید
              </label>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    id="input-mobile"
                    value={toPersianDigits(field.value)}
                    onChange={(e) => {
                      const en = toEnglishDigits(e.target.value);
                      field.onChange(en);
                    }}
                    placeHolder={toPersianDigits("4235****0919")}
                    className={errors.phone && ""}
                  />
                )}
              />

              <span>{errors.phone?.message}</span>
              <Button type="submit">ارسال کد تایید</Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            key={"step2"}
          ></motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Module;

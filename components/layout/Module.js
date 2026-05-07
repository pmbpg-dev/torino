"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import css from "./Module.module.css";
import { motion } from "motion/react";
import { ArrowLeft, X } from "lucide-react";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneSchema } from "@/core/helper/schemaForm";
import { toEnglishDigits, toPersianDigits } from "@/core/helper/convertNumber";
import { useMutation } from "@tanstack/react-query";
import { checkOTP, sendOTP } from "@/core/services/configs";
import { toast } from "sonner";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";

const LOADING_TOAST = "login-loading-toast";

function Module({ setShow, setMobile }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(0);
  //   ---------------react-hook-form-----------------
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(phoneSchema) });
  const phoneValue = watch("phone");
  //---------------send OTP code ------------------
  const { mutate: sendMutate } = useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: (phone) => sendOTP(phone),
    onMutate: () => {
      toast.loading("لطفا صبر کنید ...", {
        id: LOADING_TOAST,
        duration: Infinity,
      });
    },
    onSuccess: (data) => {
      toast.dismiss(LOADING_TOAST);
      setStep(2);
      toast.info("کد اعتبار سنجی", {
        description: `${toPersianDigits(data.code)}`,
        action: {
          label: "وارد کردن",
          onClick: () => setOtp(data.code),
        },
      });
      setTime(60);
    },
    onError: () => {
      toast.dismiss(LOADING_TOAST);
      toast.error("در ارسال کد مشکلی پیش آمده!");
    },
  });
  const sendCode = (data) => sendMutate(data.phone);
  //------------check otp code-----------------
  const { mutate: checkMutate, isPending } = useMutation({
    mutationKey: ["checkOTP"],
    mutationFn: ({ phone, otp }) => checkOTP(phone, otp),
    onMutate: () => {
      toast.loading("لطفا صبر کنید ...", {
        id: LOADING_TOAST,
        duration: Infinity,
      });
    },
    onSuccess: (res) => {
      toast.dismiss(LOADING_TOAST);
      toast.success("با موفقیت وارد شدید");
      setMobile(res.data.mobile);
      setShow(false);
      router.refresh();
    },
    onError: (err) => {
      toast.error("کد وارد شده اشتباه است");
    },
  });

  //----------------useEffect for check otp-----------
  useEffect(() => {
    if (otp.length < 6) return;
    checkMutate({ phone: phoneValue, otp: otp });
  }, [otp]);
  // --------------useEffect for timer---------------
  useEffect(() => {
    if (!time) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  //========================jsx======================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={css.container}
    >
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={css.box}
        key="box"
      >
        {step === 1 ? (
          <X onClick={() => setShow(false)} className="cursor-pointer " />
        ) : (
          <ArrowLeft
            onClick={() => {
              setStep(1);
              setOtp("");
            }}
          />
        )}

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            key={"step1"}
            className={css.boxContainer}
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
                    placeholder={toPersianDigits("4235****0919")}
                    className={`${css.phoneInput} ${errors.phone && "border-destructive"}`}
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
            className={css.boxContainer}
          >
            <p className="text-[18px] md:text-[28px] font-bold">
              کد تایید را وارد کنید.
            </p>
            <label htmlFor="otp-input" className="text-[12px] md:text-[1rem]">
              کد تایید به شماره {toPersianDigits(phoneValue)}ارسال شد
            </label>
            <OTPInput
              value={toPersianDigits(otp)}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input type="number" {...props} />}
              containerStyle={css.otpBox}
              inputStyle="!w-[36px] !h-[36px] rounded-[6px] border m-1 md:!w-[54px] md:!h-[54px]"
            />
            {time ? (
              <p className="text-muted-foreground">{`${time} ثانیه تا ارسال مجدد کد`}</p>
            ) : (
              <p
                className="text-[var(--price)] cursor-pointer"
                onClick={() => sendMutate(phoneValue)}
              >
                ارسال مجدد
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Module;

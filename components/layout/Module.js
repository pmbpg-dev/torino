"use client";
import { useEffect, useState } from "react";
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
import { checkOTP, sendOTP } from "@/services/configs";
import { toast } from "sonner";
import OTPInput from "react-otp-input";

function Module({ setShow, setMobile }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
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
    onSuccess: (data) => {
      setStep(2);
      toast.info("کد اعتبار سنجی", {
        description: `${toPersianDigits(data.code)}`,
        action: {
          label: "وارد کردن",
          onClick: () => setOtp(data.code),
        },
      });
    },
  });
  const sendCode = (data) => sendMutate(data.phone);
  //------------check otp code-----------------
  const { mutate: checkMutate } = useMutation({
    mutationKey: ["checkOTP"],
    mutationFn: ({ phone, otp }) => checkOTP(phone, otp),
    onSuccess: (res) => {
      toast.success("با موفقیت وارد شدید");
      setMobile(res.data.mobile);
      setShow(false);
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
          opacity: 0,
          scale: 0,
          translateY: "-100%",
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
            <p className="text-[28px] font-bold">کد تایید را وارد کنید.</p>
            <label htmlFor="otp-input">
              کد تایید به شماره {toPersianDigits(phoneValue)}ارسال شد
            </label>
            <OTPInput
              value={toPersianDigits(otp)}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={css.otpBox}
              inputStyle={{
                width: "54px",
                height: "54px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Module;

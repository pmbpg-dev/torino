"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function ConfirmBox({ close, func, message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 flex items-end justify-center md:p-3 md:items-center z-100 w-dvw h-dvh backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className=" hidden w-[471px] h-[162px] bg-card px-2 py-6 md:flex flex-col justify-between items-center shadow-lg rounded-2xl border"
      >
        <p className="font-bold text-center">{message}</p>
        <div className="flex items-center justify-between w-full px-8">
          <Button onClick={func} className="w-1/4">
            تایید
          </Button>
          <Button
            variant="destructive"
            onClick={() => close(false)}
            className="w-1/4"
          >
            انصراف
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ translateY: "100%" }}
        animate={{ translateY: 0 }}
        exit={{ translateY: "100%" }}
        className=" md:hidden w-[471px] h-[162px] bg-card px-2 py-6 flex flex-col justify-between items-center shadow-lg rounded-t-2xl border-2"
      >
        <p className="font-bold text-center">{message}</p>
        <div className="flex items-center justify-between w-full px-8">
          <Button onClick={func} className="w-1/4">
            تایید
          </Button>
          <Button
            variant="destructive"
            onClick={() => close(false)}
            className="w-1/4"
          >
            انصراف
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function ConfirmBox({ close, func, message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 flex items-center justify-center px-2 z-100 w-dvw h-dvh backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="w-[471px] h-[162px] bg-card px-1 py-6 flex flex-col justify-between items-center shadow-lg rounded-lg border"
      >
        <p>{message}</p>
        <div className="flex items-center justify-between w-full px-8">
          <Button onClick={func}>تایید</Button>
          <Button variant="destructive" onClick={() => close(false)}>
            انصراف
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

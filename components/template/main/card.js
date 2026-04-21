"use client";

import Image from "next/image";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { useRouter } from "next/navigation";
import { jalalidate } from "@/core/helper/convertDate";
import { calculateDays } from "@/core/helper/calculateDays";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

function Card({ data }) {
  //-------------3d effect for card(vanilla tilt)-------------
  const tiltRef = useRef(null);
  useEffect(() => {
    const element = tiltRef.current;

    VanillaTilt.init(element, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });

    return () => element.vanillaTilt.destroy();
  }, []);
  const navigate = useRouter();
  const dates = jalalidate(data.startDate, data.endDate);
  const day = calculateDays(data.startDate, data.endDate);
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.5 }}
      key={data.id}
      className="overflow-hidden transform border rounded-lg bg-card"
      ref={tiltRef}
    >
      <Image src={data.image} width={300} height={170} alt={data.title} />
      <p className="text-[22px] mt-2 mr-2 font-bold">{data.title}</p>
      <p className="my-3 mr-4 text-muted-foreground">{`${dates[2]} ماه. ${toPersianDigits(day)}روزه `}</p>
      <div className="flex justify-between w-full p-2 border-t">
        <Button
          onClick={() => navigate.push(`tours/${data.id}`)}
          className="px-8 h-[30px] "
        >
          رزرو
        </Button>
        <p className="text-[16px] text-[var(--price)]">
          {toPersianDigits(data.price.toLocaleString())}
          <span className="text-[12px] text-muted-foreground mr-2">تومان</span>
        </p>
      </div>
    </motion.div>
  );
}

export default Card;

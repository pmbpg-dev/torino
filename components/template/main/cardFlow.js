"use client";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function CardFlow() {
  return (
    <div className="flex flex-col justify-center w-full gap-8 lg:flex-row md:gap-0 md:px-12">
      <div className="flex flex-col w-full pr-12 lg:w-1/2">
        <div className="flex items-center w-full gap-3 sm:mb-4 ">
          <div className="relative w-[35px] h-[35px] md:w-[59px] md:h-[59px] text-card rounded-full flex justify-center items-center md:text-[48px] ">
            <Image
              src="/images/circle.png"
              width={59}
              height={59}
              alt=""
              className="absolute "
            />
            <span className=" z-[3]">؟</span>
          </div>
          <p className="text-[38px] font-bold">
            چرا <span className="text-primary">تورینو</span> ؟
          </p>
        </div>
        <p className="hidden mt-8 font-bold lg:block text-[24px]">
          تور طبیعت گردی و تاریخی
        </p>
        <p className="hidden w-2/3 mt-4 lg:block text-[20px]">
          اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
          طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
          طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
          آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی
          را خریداری کنید.
        </p>
      </div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "fraction",
        }}
        modules={[EffectCards, Pagination, Autoplay]}
        className="w-full md:w-[600px] h-[300px] md:h-[400px] rounded-xl !m-0 relative sm:left-10 md:left-16"
      >
        {[1, 2, 3, 4].map((slide) => (
          <SwiperSlide key={slide}>
            <div>
              <Image
                src={`/images/${slide}.jpg`}
                fill
                className="object-cover rounded-xl"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

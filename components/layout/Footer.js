"use client";

import { toPersianDigits } from "@/core/helper/convertNumber";
import css from "./Footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.info}>
          <div>
            <p>تورینو</p>
            <span>درباره ما</span>
            <span>تماس با ما</span>
            <span>چرا تورینو</span>
            <span>بیمه مسافرتی</span>
          </div>
          <div>
            <p>خدمات مشتریان</p>
            <span>پشتیبانی آنلاین</span>
            <span>راهنمای خرید</span>
            <span>راهنمای استرداد</span>
            <span>پرسش و پاسخ</span>
          </div>
        </div>
        <di className={css.details}>
          <div className={css.mark}>
            <Image src="/images/det1.png" width={74} height={74} alt="" />
            <Image src="/images/det2.png" width={74} height={74} alt="" />
            <Image src="/images/det3.png" width={74} height={74} alt="" />
            <Image src="/images/det4.png" width={74} height={74} alt="" />
            <Image src="/images/det5.png" width={74} height={74} alt="" />
          </div>
          <div className={css.logo}>
            <Image src="/images/Torino.png" width={120} height={74} alt="" />
            <p>تلفن پشتیبانی: {toPersianDigits("021-8574")}</p>
          </div>
        </di>
      </div>
      <p className={css.end}>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
    </footer>
  );
}

export default Footer;

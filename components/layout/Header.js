"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import css from "./Header.module.css";
import Sidebar from "./Sidebar";
import { ModeToggle } from "../theme/modeToggle";
import Link from "next/link";
import { getLinkClass } from "@/core/helper/getLinkClass";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Module from "./Module";
import { AnimatePresence } from "motion/react";
import DropDownBtnUser from "../DropDown/dropDownBtnUser";
import { getUser, isLogin } from "@/core/services/configs";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import axios from "axios";

function Header() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: isLogin,
  });

  useEffect(() => {
    if (mobile.length) return;
    if (data) {
      setMobile(data.user ? data.user.mobile : "");
    }
  }, [data]);

  const clickHandler = () => {
    setShow(true);
  };

  return (
    <header className={css.header}>
      {/* ----- sidebar menu-------- */}
      <div className="block lg:hidden">
        <Sidebar />
      </div>

      <div className={css.logo}>
        <ModeToggle />
        <Image
          src="/images/Torino.png"
          width={150}
          height={100}
          alt="torino logo"
        />
      </div>
      <div className={css.topMenu}>
        <Link href="/" className={getLinkClass(pathname, "/")}>
          صفحه اصلی
        </Link>
        <Link href="/" className={getLinkClass(pathname, "/helo")}>
          خدمات گردشگری
        </Link>
        <Link href="/" className={getLinkClass(pathname, "/helo")}>
          درباره ما
        </Link>
        <Link href="/helo" className={getLinkClass(pathname, "/helo")}>
          تماس با ما
        </Link>
      </div>
      {isLoading ? (
        <Button variant="outline" disabled>
          <Spinner className="size-3" />
        </Button>
      ) : mobile.length ? (
        <DropDownBtnUser mobile={mobile} setMobile={setMobile} />
      ) : (
        <Button className={css.userBtn} onClick={clickHandler}>
          <div className="items-center hidden w-full text-lg justify-evenly text-primary lg:flex">
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              alt="profile"
            />
            <span> ورود | ثبت نام</span>
          </div>
          <span className="block text-primary lg:hidden">
            <Image src="/images/login.png" width={24} height={24} alt="login" />
          </span>
        </Button>
      )}
      <AnimatePresence initial={false} mode="sync">
        {show && <Module setShow={setShow} setMobile={setMobile} />}
      </AnimatePresence>
    </header>
  );
}

export default Header;

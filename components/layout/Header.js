"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import css from "./Header.module.css";
import Sidebar from "./Sidebar";
import { ModeToggle } from "../modeToggle";
import Link from "next/link";
import { getLinkClass } from "@/helper/getLinkClass";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
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
      <Button className={css.userBtn}>
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
    </header>
  );
}

export default Header;

"use client";
import Image from "next/image";

export default function Error() {
  return (
    <div className="flex flex-col items-center w-full gap-3 py-20 md:flex-row-reverse md:justify-evenly">
      <Image width={320} height={320} src={"/images/Error.png"} />
      <div className="flex flex-col items-center justify-center gap-3 md:items-start">
        <p className="text-2xl font-bold">اتصال با سرور برقرار نیست!</p>
        <span className="font-bold">لطفا بعدا دوباره امتحان کنید.</span>
      </div>
    </div>
  );
}

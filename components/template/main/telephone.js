import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function Telephone() {
  return (
    <div className="w-[80dvw] h-[220px] md:h-[251px] border-2 rounded-[10px]  my-20 flex flex-col md:flex-row z-1">
      <div className="relative w-full md:w-3/4 h-3/5 md:h-full bg-primary md:rounded-[10px] rounded-t-[10px] flex flex-col gap-4 p-3 md:justify-center">
        <p className="text-[22px] md:text-[48px] font-bold text-background">
          خرید تلفنی از <span className="text-primary-foreground">تورینو</span>
        </p>
        <span className="text-[14px] md:text-[32px] text-background">
          به هر کجا که میخواهید!
        </span>
        <Image
          src="/images/call.png"
          width={300}
          height={300}
          className="absolute bottom-0 w-40 sm:w-64 left-2 md:w-80 "
        />
      </div>
      <div className="flex items-center w-full justify-evenly h-2/5 md:h-full md:w-1/4 md:flex-col">
        <p className="flex gap-2 text-[20px] md:text-[28px] font-bold">
          {toPersianDigits("021-1840")}
          <Phone />
        </p>
        <Button className="text-white bg-primary-foreground rounded-[9px] w-[136px] h-[38px]">
          اطلاعات بیشتر
        </Button>
      </div>
    </div>
  );
}

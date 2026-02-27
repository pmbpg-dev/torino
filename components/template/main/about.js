import Image from "next/image";

export default function About() {
  return (
    <div className="w-[90dvw] border-t-2 md:w-full mt-24 flex flex-col p-6 gap-5 md:flex-row">
      <div className="flex items-center gap-4">
        <Image src="/images/about1.png" width={100} height={100} alt="" />
        <div>
          <p className="text-[14px] md:text-[26px]">بصرفه ترین قیمت</p>
          <span className="text-[12px] md:text-[16px] text-muted-foreground">
            بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image src="/images/about2.png" width={100} height={100} alt="" />
        <div>
          <p className="text-[14px] md:text-[26px]">بصرفه ترین قیمت</p>
          <span className="text-[12px] md:text-[16px] text-muted-foreground">
            بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image src="/images/about3.png" width={100} height={100} alt="" />
        <div>
          <p className="text-[14px] md:text-[26px]">بصرفه ترین قیمت</p>
          <span className="text-[12px] md:text-[16px] text-muted-foreground">
            بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
          </span>
        </div>
      </div>
    </div>
  );
}

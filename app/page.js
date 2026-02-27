import TorsComponent from "@/components/template/main/torsComponent";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <header className="flex items-center justify-center w-full">
        <Image
          src={"/images/cover.png"}
          width={1000}
          height={1000}
          className="w-full"
        />
      </header>
      <article className="flex flex-col items-center w-full ">
        <h3 className="my-8 text-[30px]">
          <span className="ml-1 text-primary"> تورینو</span>
          برگزار کننده بهترین تور های داخلی و خارجی
        </h3>
        <TorsComponent />
      </article>
    </main>
  );
}

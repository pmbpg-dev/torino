import TorsComponent from "@/components/main/torsComponent";
import Image from "next/image";

export default function Home() {
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
        <h3>
          بگزار کننده بهترین تور های داخلی و خارجی<span>تورینو</span>
        </h3>
        <TorsComponent />
      </article>
    </main>
  );
}

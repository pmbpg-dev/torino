import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ModeToggle } from "../theme/modeToggle";
import { House, Menu, Phone, Plane, Volume1, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLinkClass } from "@/helper/getLinkClass";

function Sidebar() {
  const pathname = usePathname();
  return (
    <Drawer direction="right" className="block lg:hidden">
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="w-2/3 h-full rounded-none rounded-bl-md rounded-tl-md md:w-1/2">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between pb-4 border-b-2 ">
            <ModeToggle />
            <DrawerClose asChild>
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col px-4 overflow-y-auto no-scrollbar text-md">
          <Link
            href="/"
            className={`w-full mt-4 flex ${getLinkClass(pathname, "/")}`}
          >
            <House className="ml-2" />
            صفحه اصلی
          </Link>
          <Link href="/" className={`w-full mt-4 flex`}>
            <Plane className="ml-2" />
            خدمات گردشگری
          </Link>
          <Link href="/" className={`w-full mt-4 flex`}>
            <Volume1 className="ml-2" />
            درباره ما
          </Link>
          <Link
            href="/helo"
            className={`w-full mt-4 flex ${getLinkClass(pathname, "/helo")}`}
          >
            <Phone className="ml-2" />
            تماس با ما
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Sidebar;

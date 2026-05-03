"use client";

import {
  ChevronDown,
  CircleUser,
  CircleUserRound,
  LogOutIcon,
  ShoppingBasket,
  UserCog,
} from "lucide-react";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBasket, logout } from "@/core/services/configs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmBox from "@/components/layout/ConfirmBox";
function DropDownBtnUser({ mobile, setMobile }) {
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (res) => {
      setMobile("");
      toast.success(res.data.message);
      router.push("/");
    },
  });
  const { data } = useQuery({
    queryKey: ["getTourBasketNum"],
    queryFn: async () => await getBasket(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-1 border-none shadow-none text-primary !bg-transparent md:text-md">
          <CircleUser />
          {toPersianDigits(mobile)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 bg-card">
        <DropdownMenuLabel className="flex rounded bg-background">
          <CircleUserRound className="w-4 ml-2" />
          {toPersianDigits(mobile)}
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="mt-1 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <UserCog />
          اطلاعات حساب کاربری
        </DropdownMenuItem>
        <DropdownMenuItem
          className="mt-1 cursor-pointer"
          onClick={() => router.push("/basket")}
        >
          {data?.data && (
            <span className="text-[10px] text-white rounded-lg bg-destructive px-1">
              New
            </span>
          )}
          <ShoppingBasket />
          سبد خرید
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer !text-destructive"
          onClick={() => setIsShowConfirm(true)}
        >
          <LogOutIcon />
          خروج از حساب کاربری
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AnimatePresence initial={false} mode="sync">
        {isShowConfirm && (
          <ConfirmBox
            close={setIsShowConfirm}
            func={mutate}
            message="آیا از خروج از حساب کاربری مطمعن هستید؟"
          />
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}

export default DropDownBtnUser;

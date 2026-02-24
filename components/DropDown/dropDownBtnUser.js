"use client";

import {
  ChevronDown,
  CircleUser,
  CircleUserRound,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toPersianDigits } from "@/core/helper/convertNumber";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/core/services/configs";
import { toast } from "sonner";
function DropDownBtnUser({ mobile, setMobile }) {
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (res) => {
      setMobile("");
      toast.success(res.data.message);
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-none shadow-none text-primary bg-card">
          <CircleUser />
          {toPersianDigits(mobile)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1">
        <DropdownMenuLabel className="flex rounded bg-background">
          <CircleUserRound className="w-4 ml-2" />
          {toPersianDigits(mobile)}
        </DropdownMenuLabel>
        <DropdownMenuItem className="mt-1 cursor-pointer">
          <UserIcon />
          اطلاعات حساب کاربری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer text-destructive"
          onClick={mutate}
        >
          <LogOutIcon />
          خروج از حساب کاربری
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownBtnUser;

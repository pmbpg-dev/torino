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
import { toPersianDigits } from "@/helper/convertNumber";
function DropDownBtnUser({ mobile }) {
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
        >
          <LogOutIcon />
          خروج از حساب کاربری
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownBtnUser;

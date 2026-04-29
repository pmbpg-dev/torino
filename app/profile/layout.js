import TabBar from "@/components/layout/TabBar";
import React from "react";
export const metadata = {
  title: "پروفایل",
  description: "صفحه حساب کاربری",
};
export default function ProfileLayout({ children }) {
  return (
    <div className="flex flex-col w-full px-6 md:flex-row ">
      <TabBar />
      {children}
    </div>
  );
}

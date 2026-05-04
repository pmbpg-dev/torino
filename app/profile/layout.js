import ProfileSideBar from "@/components/layout/ProfileSideBar";
import TabBar from "@/components/layout/TabBar";
import React from "react";
export const metadata = {
  title: "پروفایل",
  description: "صفحه حساب کاربری",
};
export default function ProfileLayout({ children }) {
  return (
    <div className="flex flex-col w-full px-8 lg:px-16 md:flex-row ">
      <TabBar />
      <ProfileSideBar />
      {children}
    </div>
  );
}

import { ShoppingBasket } from "lucide-react";
import React from "react";

export const metadata = {
  title: "سبد خرید",
  description: "سبد خرید تور های شما",
};
function BasketLayout({ children }) {
  return (
    <div className="flex flex-col px-3 py-4 md:flex-row">
      <div className="flex items-center justify-center w-full h-20 mb-2 border-2 bg-card rounded-xl md:w-1/3 md:ml-2 ">
        <ShoppingBasket />
        <p className="text-2xl">سبد خرید شما:</p>
      </div>
      {children}
    </div>
  );
}

export default BasketLayout;

import { toPersianDigits } from "./convertNumber";

export const formatCartNumber = (num) => {
  const cartNum = num.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  return toPersianDigits(cartNum);
};

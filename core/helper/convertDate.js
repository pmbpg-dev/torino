import dayjs from "dayjs";
import jalaliday from "jalali-plugin-dayjs";
import { toPersianDigits } from "./convertNumber";

dayjs.extend(jalaliday);

export const jalalidate = (start, end) => {
  const sDate = dayjs(start)
    .calendar("jalali")
    .locale("fa")
    .format("DD MMMM YYYY");
  const eDate = dayjs(end)
    .calendar("jalali")
    .locale("fa")
    .format("DD MMMM YYYY");
  const sMonth = dayjs(start).calendar("jalali").locale("fa").format("MMMM");

  return [toPersianDigits(sDate), toPersianDigits(eDate), sMonth];
};

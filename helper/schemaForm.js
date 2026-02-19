import { object, string } from "yup";

const phoneRegex = /^(\+98|0)?9\d{9}$/;

export const phoneSchema = object().shape({
  phone: string()
    .required("شماره موبایل نمی‌تواند خالی باشد")
    .matches(phoneRegex, "شماره تلفن وارد شده صحیح نمی باشد!"),
});

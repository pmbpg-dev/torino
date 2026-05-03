import { date, object, string } from "yup";

const phoneRegex = /^(\+98|0)?9\d{9}$/;

export const phoneSchema = object().shape({
  phone: string()
    .required("شماره موبایل نمی‌تواند خالی باشد")
    .matches(phoneRegex, "شماره تلفن وارد شده صحیح نمی باشد!"),
});

export const validationTraveler = object().shape({
  fullName: string()
    .required("نام و نام خانودگی الزامی است")
    .min(3, "نام باید بیشتر از 3 حرف باشد"),
  nationalCode: string()
    .required("کد ملی الزامی است")
    .length(10, "کد ملی باید 10 کاراکتر باشد")
    .matches(/^\d+$/, "کد ملی باید تنها شامل اعداد باشد"),

  gender: string().required("انتخاب جنسیت الزامی است"),

  birthDate: date()
    .required("تاریخ تولد الزامی است")
    .nullable()
    .typeError("تاریخ باید معتبر باشد"),
});

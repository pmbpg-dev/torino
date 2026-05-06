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
    .matches(
      /^[A-Za-z\u0600-\u06FF\s]+$/,
      "فقط حروف انگلیسی/فارسی و فاصله مجاز است",
    )
    .test(
      "two-words",
      "نام و نام خانوادگی را کامل وارد کنید",
      (value) => value && value.trim().split(" ").length >= 2,
    ),
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

export const emailSchema = object().shape({
  email: string().trim().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export const bankSchema = object().shape({
  debitCard_code: string()
    .required("شماره کارت الزامی است")
    .length(16, "شماره کارت باید 16 رقم باشد")
    .transform((value) => value?.replace(/\s|-/g, "") || ""),

  shaba_code: string()
    .required("شماره شبا الزامی است")
    .transform((value) => value?.replace(/\s|-/g, "").toUpperCase() || "")
    .matches(/^\d{20,26}$/, "شماره شبا باید بین 20 تا 26 "),

  accountIdentifier: string()
    .required("شماره حساب الزامی است")
    .transform((value) => value?.replace(/\s|-/g, "") || "")
    .matches(/^\d{10,13}$/, "شماره حساب باید بین 10 تا 13 "),
});

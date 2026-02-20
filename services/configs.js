const { default: axios } = require("axios");

const sendOTP = async (phone) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_DB_HOST}/auth/send-otp`,
    {
      mobile: phone,
    },
  );
  return res.data;
};

const checkOTP = async (phone, otp) => {
  try {
    const res = await axios.post("/api/auth/verify", {
      mobile: phone,
      code: otp,
    });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export { sendOTP, checkOTP };

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

const getUser = async () => {
  const res = await axios.get("/api/user");
  return res;
};

const logout = async () => {
  const res = await axios.post("/api/user/logout");
  return res;
};

export { sendOTP, checkOTP, getUser, logout };

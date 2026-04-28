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
    const res = await axios.post("/api/auth/check-otp", {
      mobile: phone,
      code: otp,
    });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

const getUser = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_HOST}/user`);
  return res;
};

const logout = async () => {
  const res = await axios.post("/api/user/logout");
  return res;
};

const isLogin = async () => {
  const host = process.env.NEXT_PUBLIC_NEXT_HOST;
  const res = await axios.get(`${host}/user/isLogin`);
  return res.data;
};

const getTors = async (query) => {
  const url = query
    ? `${process.env.NEXT_PUBLIC_DB_HOST}/tour?${query}`
    : `${process.env.NEXT_PUBLIC_DB_HOST}/tour`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

const addToBasket = async (tourId) => {
  try {
    const res = await axios.post(`/api/basket/${tourId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { sendOTP, checkOTP, getUser, logout, isLogin, getTors, addToBasket };

// 'http://localhost:6500/tour?destinationId=2&originId=1&startDate=2025-10-05T00%3A00%3A00.000Z&endDate=2025-10-10T00%3A00%3A00.000Z'

const { default: axios } = require("axios");

const host = process.env.NEXT_PUBLIC_NEXT_HOST;

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
  const res = await axios.get(`${host}/user`);
  return res.data;
};

const logout = async () => {
  const res = await axios.post("/api/user/logout");
  return res;
};

const isLogin = async () => {
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
const getBasket = async () => {
  try {
    const res = await axios.get(`${host}/basket`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
const orderPay = async (data) => {
  const res = await axios.post(`${host}/order`, data);
  return res;
};

const getTransactions = async () => {
  const res = await axios.get(`${host}/user/transactions`);
  return res;
};

const updateProfile = async (data) => {
  const res = await axios.put(`${host}/user`, data);
  return res.data;
};

export {
  sendOTP,
  checkOTP,
  getUser,
  logout,
  isLogin,
  getTors,
  addToBasket,
  getBasket,
  orderPay,
  getTransactions,
  updateProfile,
};

// 'http://localhost:6500/tour?destinationId=2&originId=1&startDate=2025-10-05T00%3A00%3A00.000Z&endDate=2025-10-10T00%3A00%3A00.000Z'

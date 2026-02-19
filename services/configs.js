const { default: axios } = require("axios");

const sendOTP = async (phone) => {
  const res = await axios.post(process.env.NEXT_PUBLIC_DB_HOST, {
    mobile: phone,
  });
  return res.data;
};

export { sendOTP };

import { createServerAxios } from "@/core/lib/serverAxios";

export async function GET() {
  const axios = createServerAxios();
  try {
    const res = await axios.get(`/user/transactions`);
    return Response.json(res.data);
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

import { createServerAxios } from "@/core/lib/serverAxios";

export async function GET() {
  const axios = createServerAxios();
  try {
    const res = await axios.get("/user/tours");
    return Response.json({ data: res.data }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Error to get tours" }, { status: 402 });
  }
}

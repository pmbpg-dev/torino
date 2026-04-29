import { createServerAxios } from "@/core/lib/serverAxios";

export async function GET() {
  const axios = createServerAxios();
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/basket`);
    return Response.json({ data: res.data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "error to get basket data" },
      { status: 402 },
    );
  }
}

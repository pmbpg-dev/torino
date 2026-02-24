import { cookies } from "next/headers";
import { createServerAxios } from "@/core/lib/serverAxios";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const axios = createServerAxios();
    const res = await axios.get(`/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return Response.json({ user: res.data });
  } catch (err) {
    return Response.json({ user: null }, { status: 401 });
  }
}

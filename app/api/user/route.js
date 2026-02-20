import { cookies } from "next/headers";
import axios from "axios";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return Response.json({ user: res.data });
  } catch (err) {
    return Response.json({ user: null }, { status: 401 });
  }
}

import { cookies } from "next/headers";

export async function GET() {
  const userCookie = cookies().get("accessToken")?.value;
  if (!userCookie) return Response.json({ user: false });

  const userIfo = cookies().get("user")?.value;
  const user = userIfo ? JSON.parse(userIfo) : false;
  return Response.json({ user });
}

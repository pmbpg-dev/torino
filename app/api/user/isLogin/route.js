import { cookies } from "next/headers";

export async function GET() {
  const userCookie = cookies().get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : false;
  return Response.json({ user });
}

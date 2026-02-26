import { cookies } from "next/headers";

export async function GET() {
  const userCookie = cookies().get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return Response.json({ user });
}

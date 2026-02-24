import { cookies } from "next/headers";

export async function GET() {
  const userCookie = cookies().get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;
  console.log(user);

  return Response.json({ user });
}

import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/auth/refresh-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!res.ok) {
    return Response.json({ error: "refresh failed" }, { status: 401 });
  }

  const data = await res.json();

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    path: "/",
  });

  return Response.json({ accessToken: data.accessToken });
}

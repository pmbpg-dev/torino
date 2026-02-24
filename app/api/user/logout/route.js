import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  try {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");

    return Response.json({
      success: true,
      message: "خروج با موفقیت انجام شد.",
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "logout failed" }, { status: 500 });
  }
}

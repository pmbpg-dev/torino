import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  try {
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return Response.json({
      success: true,
      message: "خروج با موفقیت انجام شد.",
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "logout failed" }, { status: 500 });
  }
}

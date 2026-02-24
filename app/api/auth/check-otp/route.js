import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { mobile, code } = await req.json();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_HOST}/auth/check-otp`,
      {
        mobile,
        code,
      },
    );

    const data = res.data;

    const { accessToken, refreshToken, user } = data;

    const cookieStore = cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("user", JSON.stringify(user), {
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.json({ success: true, mobile: user.mobile });
  } catch (err) {
    return Response.json(
      { message: "کد وارد شده اشتباه است" },
      { status: 400 },
    );
  }
}

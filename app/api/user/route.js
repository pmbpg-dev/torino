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
    const res = await axios.get(`/user/profile`);
    return Response.json({ user: res.data }, { status: 200 });
  } catch (err) {
    return Response.json({ user: null }, { status: 500 });
  }
}
export async function PUT(req) {
  const axios = createServerAxios();
  const newData = await req.json();
  try {
    const res = await axios.put("/user/profile", newData);
    return Response.json(
      { message: "پروفایل با موفقیت اپدیت شد.", date: res.data },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { message: "ویرایش پروفایل به مشکل خورد!" },
      { status: 500 },
    );
  }
}

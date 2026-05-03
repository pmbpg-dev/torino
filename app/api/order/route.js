import { createServerAxios } from "@/core/lib/serverAxios";

export async function POST(req) {
  const axios = createServerAxios();

  try {
    const { nationalCode, fullName, gender, birthDate } = await req.json();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_HOST}/order`, {
      nationalCode,
      fullName,
      gender,
      birthDate,
    });

    return Response.json(res);
  } catch (err) {
    return Response.json(err);
  }
}

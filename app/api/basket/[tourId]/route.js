import { createServerAxios } from "@/core/lib/serverAxios";

export async function POST(request, { params }) {
  const axios = createServerAxios();
  const { tourId } = params;
  if (!tourId)
    return Response.json(
      { message: "Tour ID is Required!", error: true },
      { status: 400 },
    );

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_DB_HOST}/basket/${tourId}`,
      { tourId },
    );
    return Response.json(
      {
        message: res.data.message,
        error: false,
      },
      { status: res.status },
    );
  } catch (err) {
    return Response.json(
      {
        message: "لطفا دوباره امتحان کنید!",
        error: true,
      },
      { status: 500 },
    );
  }
}

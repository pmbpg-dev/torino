import { extractCities } from "@/core/helper/cityList";
import { getTors } from "@/core/services/configs";

export async function GET() {
  try {
    const res = await getTors();
    const cities = extractCities(res.data);
    return Response.json(cities);
  } catch (err) {
    return Response.json({ data: [] });
  }
}

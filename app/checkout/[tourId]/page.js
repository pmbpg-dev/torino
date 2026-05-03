import CheckoutForm from "@/components/template/checkout/CheckoutForm";
import SelectGender from "@/components/template/DropDown/selectGender";

export default async function TourCheckout({ params }) {
  const { tourId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/tour/${tourId}`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
}

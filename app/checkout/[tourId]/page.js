import CheckoutForm from "@/components/template/checkout/CheckoutForm";

export default async function TourCheckout({ params }) {
  const { tourId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/tour/${tourId}`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
}

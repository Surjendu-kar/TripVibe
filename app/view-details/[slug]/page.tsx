import { notFound } from "next/navigation";
import ClientPage from "@/components/view-details/client-page/ClientPage";
import getData from "@/lib/fetchData";

export default async function Page({ params }: { params: { slug: string } }) {
  const fetchedTrips = await getData();
  const trip = fetchedTrips.find((trip) => trip._id === params.slug);

  if (!trip) {
    console.log("Trip not found, calling notFound()");
    notFound();
  }

  return <ClientPage initialTrip={trip} />;
}
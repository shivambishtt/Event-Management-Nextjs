"use client";
import Map from "@/components/Map";

interface Props {
  latitude: number;
  longitude: number;
  title: string;
  slug: string;
}

function Location({ latitude, longitude, title, slug }: Props) {
  const openMap = async () => {
    await fetch(`/api/events/${slug}/location`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: latitude,
        lon: longitude,
      }),
    });
  };
  return <Map latitude={latitude} longitude={longitude} title={title} />;
}

export default Location;

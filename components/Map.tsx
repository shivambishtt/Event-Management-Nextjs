"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

interface MapProps {
  latitude: number;
  longitude: number;
  title?: string;
}

function Map({ latitude, longitude, title }: MapProps) {
  useEffect(() => {
    // 🔥 Fix default marker icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="map-container h-screen w-full">
      <MapContainer
        className="h-full w-full"
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{title || "Event Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;

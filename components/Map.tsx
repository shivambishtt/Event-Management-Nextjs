"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

interface Coordinates {
  latitude: number;
  longitude: number;
}

function Map() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

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

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        alert("Permission denied or error");
      },
    );
  }, []);

  return (
    <div className="map-container h-screen w-full">
      {coordinates && (
        <MapContainer
          className="h-full w-full"
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup>Your current location</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default Map;

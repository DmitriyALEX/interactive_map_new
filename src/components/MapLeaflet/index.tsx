import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "./style.css";

import MarkersMap from "../MarkersMap";
import { useEffect, useRef } from "react";

const MapLeaflet = () => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.options.preferCanvas = true;
    }
  }, []);

  return (
    <div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          animate={false}
          iconCreateFunction={(cluster: L.MarkerCluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div>${count}</div>`,
              className: "marker-cluster",
              iconSize: L.point(40, 40),
            });
          }}
        >
          <MarkersMap />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapLeaflet;

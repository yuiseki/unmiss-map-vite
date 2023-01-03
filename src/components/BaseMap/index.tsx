import React from "react";
import { AttributionControl, Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const BaseMap: React.FC<{
  longitude: number;
  latitude: number;
  zoom: number;
  children?: any;
  style?: string;
}> = ({
  longitude,
  latitude,
  zoom,
  children,
  style = "https://yuiseki.github.io/vector-tile-south-sudan/style.json",
}) => {
  return (
    <Map
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
      mapLib={maplibregl}
      mapStyle={style}
      attributionControl={true}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
      }}
      hash={true}
    >
      {children}
      <NavigationControl position="bottom-right" />
    </Map>
  );
};

import React from "react";
import { Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as pmtiles from "pmtiles";

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
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);
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

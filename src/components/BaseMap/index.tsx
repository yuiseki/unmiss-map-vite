import React, { useCallback } from "react";
import { Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as pmtiles from "pmtiles";
/* @ts-ignore */
import * as gsidem from "../../protocols/gsidem";

export const BaseMap: React.FC<{
  longitude: number;
  latitude: number;
  zoom: number;
  children?: any;
  style?: string;
  onMapLoad?: () => void;
}> = ({
  longitude,
  latitude,
  zoom,
  children,
  style = "https://yuiseki.github.io/vector-tile-south-sudan/style.json",
  onMapLoad,
}) => {
  // pmtiles protocol
  let pmtilesProtocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);

  // gsidem protocol
  maplibregl.addProtocol("gsidem", gsidem.tile);

  const onLoad = useCallback(() => {
    if (onMapLoad) {
      onMapLoad();
    }
  }, []);

  return (
    <Map
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
      onLoad={onLoad}
      mapLib={maplibregl}
      mapStyle={style}
      attributionControl={true}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
      }}
      hash={true}
      maxZoom={22}
      maxPitch={85}
    >
      {children}
      <NavigationControl
        position="bottom-right"
        visualizePitch={true}
        showZoom={true}
        showCompass={true}
      />
    </Map>
  );
};
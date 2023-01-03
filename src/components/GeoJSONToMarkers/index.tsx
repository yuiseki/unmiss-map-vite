import * as turf from "@turf/turf";
import { Feature, FeatureCollection, GeoJsonProperties, Point } from "geojson";
import { GeoJSONFeature } from "maplibre-gl";
import { useCallback } from "react";
import { Marker, useMap } from "react-map-gl";
import { feature } from "turf";

export const GeoJSONToMarkers: React.FC<{
  geojson: FeatureCollection;
  emoji?: string;
}> = ({ geojson, emoji }) => {
  const { current: map } = useMap();
  const onClickMarker = useCallback(
    (center: Feature<Point, GeoJsonProperties>) => {
      if (map === undefined) {
        return;
      }
      const zoomTo = map.getZoom() < 10 ? 10 : 14;
      map.flyTo({
        center: [
          center.geometry.coordinates[0],
          center.geometry.coordinates[1],
        ],
        zoom: zoomTo,
      });
    },
    []
  );
  if (geojson === undefined) {
    return null;
  }
  return (
    <>
      {geojson.features.map((feature) => {
        if (feature.geometry.type !== "Polygon") {
          return null;
        }
        let icon = emoji;
        if (
          (feature.properties &&
            feature.properties.operator &&
            (feature.properties.operator.includes("UN") ||
              feature.properties.operator.includes("United Nations"))) ||
          (feature.properties &&
            feature.properties.name &&
            (feature.properties.name.includes("UN") ||
              feature.properties.name.includes("United Nations")))
        ) {
          icon = "🇺🇳";
        }
        const polygonFeatures = turf.polygon(feature.geometry.coordinates);
        const center = turf.centroid(polygonFeatures);
        return (
          <Marker
            key={feature.id}
            longitude={center.geometry.coordinates[0]}
            latitude={center.geometry.coordinates[1]}
            onClick={() => onClickMarker(center)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "2em", fontFamily: "emoji" }}>{icon}</div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
              >
                {feature.properties &&
                feature.properties.name &&
                feature.properties.name.length > 0
                  ? feature.properties.name
                  : "No name"}
              </div>
            </div>
          </Marker>
        );
      })}
    </>
  );
};

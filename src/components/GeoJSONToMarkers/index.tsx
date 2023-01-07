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
    (center: Feature<Point, GeoJsonProperties> | undefined) => {
      if (map === undefined || center === undefined) {
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
        if (feature.geometry === undefined) {
          return null;
        }
        if (
          feature.geometry.type !== "Polygon" &&
          feature.geometry.type !== "LineString" &&
          feature.geometry.type !== "Point"
        ) {
          return null;
        }

        let zIndex = 100;
        let fontSize = "2em";
        let icon = emoji;
        let name = "No name";
        let title = "No name";

        if (
          feature.properties &&
          feature.properties.name &&
          feature.properties.name.length > 0
        ) {
          name = feature.properties.name;
          title = feature.properties.name;
        }

        // United Nations
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
          zIndex = 110;
        }

        // Road closed
        if (emoji === "🚧") {
          zIndex = 115;
          fontSize = "1em";
          name = "";
        }

        // Incidents
        if (emoji === "⚠️") {
          zIndex = 120;
          if (feature.properties && feature.properties["incident:detail"]) {
            name = feature.properties["incident:detail"];
          }
        }

        let center: Feature<Point, GeoJsonProperties> | undefined = undefined;
        switch (feature.geometry.type) {
          case "Polygon":
            const polygonFeatures = turf.polygon(feature.geometry.coordinates);
            center = turf.centroid(polygonFeatures);
            break;
          case "LineString":
            const bbox = turf.bbox(feature);
            const polygon = turf.bboxPolygon(bbox);
            center = turf.centroid(polygon);
            break;
          case "Point":
            center = turf.point(feature.geometry.coordinates);
          default:
            break;
        }
        if (center === undefined) {
          return null;
        }
        return (
          <Marker
            key={feature.id}
            longitude={center.geometry.coordinates[0]}
            latitude={center.geometry.coordinates[1]}
            onClick={() => onClickMarker(center)}
            style={{ zIndex: zIndex }}
          >
            <div
              title={title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{ fontSize: fontSize, fontFamily: "sans-serif, emoji" }}
              >
                {icon}
              </div>
              <div
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  padding: "0 3px",
                }}
              >
                {name}
              </div>
            </div>
          </Marker>
        );
      })}
    </>
  );
};

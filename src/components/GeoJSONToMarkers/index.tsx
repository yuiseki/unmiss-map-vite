import * as turf from "@turf/turf";
import { FeatureCollection } from "geojson";
import { Marker } from "react-map-gl";

export const GeoJSONToMarkers: React.FC<{
  geojson: FeatureCollection;
  emoji?: string;
}> = ({ geojson, emoji }) => {
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
        const features = turf.polygon(feature.geometry.coordinates);
        const center = turf.centroid(features);
        return (
          <Marker
            key={feature.id}
            longitude={center.geometry.coordinates[0]}
            latitude={center.geometry.coordinates[1]}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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

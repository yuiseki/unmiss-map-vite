import { FillLayer, Layer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const layerStyle: FillLayer = {
  id: "military",
  type: "fill",
  source: "military",
  layout: {},
  paint: {
    "fill-color": "#FF8C00",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

export const MilitaryLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/GeoJSON/military.geojson", fetcher);

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="🪖" />
          <Source id="military" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </>
      )}
    </>
  );
};

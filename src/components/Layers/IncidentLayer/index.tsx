import { FillLayer, Layer, LineLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const fillStyle: FillLayer = {
  id: "incident",
  type: "fill",
  source: "incident",
  layout: {},
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "incident-line",
  type: "line",
  source: "incident",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "red",
    "line-opacity": 0.5,
    "line-width": 10,
  },
};

export const IncidentLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/incident.geojson", fetcher);

  return (
    <>
      <GeoJSONToMarkers geojson={geojson} emoji="⚠️" />
      <Source id="incident" type="geojson" data={geojson}>
        <Layer {...fillStyle} />
        <Layer {...lineStyle} />
      </Source>
    </>
  );
};

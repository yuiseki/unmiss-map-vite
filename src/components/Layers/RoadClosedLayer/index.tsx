import { FillLayer, Layer, LineLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const fillStyle: FillLayer = {
  id: "road-closed",
  type: "fill",
  source: "road-closed",
  layout: {},
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "road-closed-line",
  type: "line",
  source: "road-closed",
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

export const RoadClosedLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/road_closed.geojson", fetcher);

  return (
    <>
      <GeoJSONToMarkers geojson={geojson} emoji="🚧" />
      <Source id="road-closed" type="geojson" data={geojson}>
        <Layer {...fillStyle} />
        <Layer {...lineStyle} />
      </Source>
    </>
  );
};

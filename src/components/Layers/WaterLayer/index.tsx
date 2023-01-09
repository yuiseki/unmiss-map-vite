import { FillLayer, Layer, LineLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const fillStyle: FillLayer = {
  id: "water",
  type: "fill",
  source: "water",
  layout: {},
  paint: {
    "fill-color": "blue",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "water-line",
  type: "line",
  source: "water",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "blue",
    "line-opacity": 0.5,
    "line-width": 10,
  },
};

export const WaterLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/GeoJSON/water.geojson", fetcher);

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="🚰" />
          <Source id="water" type="geojson" data={geojson}>
            <Layer {...fillStyle} />
            <Layer {...lineStyle} />
          </Source>
        </>
      )}
    </>
  );
};

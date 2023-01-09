import { FillLayer, Layer, LineLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const fillStyle: FillLayer = {
  id: "refugee-site",
  type: "fill",
  source: "refugee-site",
  layout: {},
  paint: {
    "fill-color": "blue",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "refugee-site-line",
  type: "line",
  source: "refugee-site",
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

export const RefugeeSiteLayer: React.FC = () => {
  const { data: geojson } = useSWR(
    "./data/GeoJSON/refugee_site.geojson",
    fetcher
  );

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="✅" />
          <Source id="refugee-site" type="geojson" data={geojson}>
            <Layer {...fillStyle} />
            <Layer {...lineStyle} />
          </Source>
        </>
      )}
    </>
  );
};

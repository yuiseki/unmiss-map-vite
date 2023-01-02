import { FillLayer, Layer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const layerStyle: FillLayer = {
  id: "power",
  type: "fill",
  source: "power",
  layout: {},
  paint: {
    "fill-color": "#0080ff",
    "fill-opacity": 0.7,
  },
  filter: ["==", "$type", "Polygon"],
};

export const PowerLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/power.geojson", fetcher);

  return (
    <>
      <GeoJSONToMarkers geojson={geojson} emoji="💡" />
      <Source id="power" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </>
  );
};

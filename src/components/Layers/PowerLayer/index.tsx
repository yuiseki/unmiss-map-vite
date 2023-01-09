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
    "fill-color": "#FF8C00",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

export const PowerLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/GeoJSON/power.geojson", fetcher);

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="💡" />
          <Source id="power" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </>
      )}
    </>
  );
};

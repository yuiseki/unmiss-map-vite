import { Layer, LineLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const layerStyle: LineLayer = {
  id: "country-border",
  type: "line",
  source: "country-border",
  layout: {},
  paint: {
    "line-color": "#0080ff",
    "line-width": 3,
  },
  filter: ["==", "$type", "Polygon"],
};

export const CountryBorderLayer: React.FC = () => {
  const { data: geojson } = useSWR("/data/boundary.geojson", fetcher);

  return (
    <>
      <Source id="country-border" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </>
  );
};

import { FillLayer, Layer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const layerStyle: FillLayer = {
  id: "hospital",
  type: "fill",
  source: "hospital",
  layout: {},
  paint: {
    "fill-color": "#FF8C00",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

export const HospitalLayer: React.FC = () => {
  const { data: geojson } = useSWR("./data/hospital.geojson", fetcher);

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="🏥" />
          <Source id="hospital" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </>
      )}
    </>
  );
};

import { Layer, RasterLayer, Source } from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";

const layerStyle: RasterLayer = {
  id: "population",
  type: "raster",
  source: "population",
  layout: {},
  paint: {
    "raster-opacity": 0.6,
  },
};

export const PopulationLayer: React.FC = () => {
  return (
    <>
      <Source
        id="population"
        type="image"
        url="./data/ssd_pd_2020_1km_UNadj.png"
        coordinates={[
          [24.1487499, 12.2245835],
          [35.3154165, 12.2245835],
          [35.3154165, 3.4912502],
          [24.1487499, 3.4912502],
        ]}
      >
        <Layer {...layerStyle} />
      </Source>
    </>
  );
};

import * as turf from "@turf/turf";
import {
  FillLayer,
  Layer,
  LineLayer,
  Source,
  ViewState,
  useMap,
} from "react-map-gl";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { GeoJSONToMarkers } from "../../GeoJSONToMarkers";
import { useOverpass } from "../../../hooks/overpass";
import { useEffect, useState } from "react";
import { FeatureCollection, GeometryObject } from "geojson";
import { useDebounce } from "../../../hooks/debounce";

const fillStyle: FillLayer = {
  id: "road-edit",
  type: "fill",
  source: "road-edit",
  layout: {},
  paint: {
    "fill-color": "yellow",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "road-edit-line",
  type: "line",
  source: "road-edit",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "yellow",
    "line-opacity": 0.4,
    "line-width": 5,
  },
};

export const RoadEditLayer: React.FC<{ viewState?: ViewState }> = ({
  viewState,
}) => {
  const { current: map } = useMap();
  const debouncedViewState = useDebounce<ViewState>(viewState, 2500);
  const { loadingOverpass, fetchOverpassRoads } = useOverpass();
  const [geojson, setGeojson] = useState<FeatureCollection<GeometryObject>>();

  useEffect(() => {
    (async () => {
      if (map === undefined) {
        return;
      }
      const zoom = map.getZoom();
      if (zoom < 8) {
        return;
      }
      const bounds = map.getBounds();

      const newGeojson = await fetchOverpassRoads([
        bounds.getSouth(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getEast(),
      ]);
      setGeojson(newGeojson);
    })();
  }, [map, debouncedViewState]);

  return (
    <>
      {geojson && (
        <>
          <GeoJSONToMarkers geojson={geojson} emoji="🚗" />
          <Source id="road-edit" type="geojson" data={geojson}>
            <Layer {...fillStyle} />
            <Layer {...lineStyle} />
          </Source>
        </>
      )}
    </>
  );
};

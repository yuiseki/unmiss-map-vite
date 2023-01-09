import { BBox, FeatureCollection } from "geojson";
import osmtogeojson from "osmtogeojson";
import { useCallback, useState } from "react";

const emptyGeoJSON = {
  type: "FeatureCollection",
  features: [],
} as FeatureCollection;

export const useOverpass = () => {
  const [loadingOverpass, setLoadingOverpass] = useState(false);

  const fetchOverpassRoads = useCallback(async (bbox: number[]) => {
    if (loadingOverpass) {
      console.log("overpass: loading!");
      return emptyGeoJSON;
    }

    console.log("overpass: loading...", bbox);

    const query = `
      [out:json][timeout:1000];
      (
        way[highway="primary"](${bbox.join(",")});
        way[highway="secondary"](${bbox.join(",")});
        way[highway="tertiary"](${bbox.join(",")});
        //way[highway="unclassified"](${bbox.join(",")});
      );
      out geom;
      `;
    console.log("overpass query: ", query);
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const json = await res.json();
    const geojson = osmtogeojson(json);
    console.log("overpass osmtogeojson converted: ", geojson);
    console.log("overpass: loaded.");
    setLoadingOverpass(false);
    return geojson;
  }, []);

  return {
    loadingOverpass,
    fetchOverpassRoads,
  };
};

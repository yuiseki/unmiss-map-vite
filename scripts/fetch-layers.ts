import { load } from "js-yaml";
import { readFileSync, writeFileSync } from "fs";
import osmtogeojson from "osmtogeojson";

const config = load(readFileSync("scripts/layers.yml", "utf8")) as any;

const convertOverpassTag = (nwr: any) => {
  return nwr
    .map((nwr: any) => {
      return Object.keys(nwr).map((key) => {
        if (nwr[key]) {
          return `${key}="${nwr[key]}"`;
        } else {
          return key;
        }
      });
    })
    .flat();
};

const convertOverpassNWRQuery = (subject: string, tags: string[]) => {
  return tags.map((tag: string) => {
    return `${subject}[${tag}](area.a)`;
  });
};

const area_key = Object.keys(config.area)[0];
const area_value = config.area[area_key];

for await (const layer of config.layers) {
  let subject = "";
  let tags = [];
  let nwrQuery: string[][] = [];
  if (layer.nwr) {
    subject = "nwr";
    tags = convertOverpassTag(layer.nwr);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.node) {
    subject = "node";
    tags = convertOverpassTag(layer.node);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.way) {
    subject = "way";
    tags = convertOverpassTag(layer.way);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.relation) {
    subject = "relation";
    tags = convertOverpassTag(layer.relation);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }

  const query = `
    [out:json][timeout:30000];
    area['${area_key}'='${area_value}']->.a;
    (
      ${nwrQuery.flat().join(";\n      ")};
    );
    out geom;
  `;
  console.log(query);

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  const json = await res.json();
  const geojson = osmtogeojson(json);

  writeFileSync(
    `public/data/GeoJSON/${layer.name}.geojson`,
    JSON.stringify(geojson, undefined, 2)
  );
}

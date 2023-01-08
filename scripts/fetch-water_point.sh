
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr[amenity='water_point'](area.a);
  nwr[man_made='water_well'](area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/water_point.osm.json
osmtogeojson ./tmp/water_point.osm.json > ./public/data/water_point.geojson

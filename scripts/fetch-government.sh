
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr[government](area.a);
  nwr[office='government'](area.a);
  nwr[office='quango'](area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/government.osm.json
osmtogeojson ./tmp/government.osm.json > ./public/data/government.geojson


body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr[operator='United Nations'](area.a);
  nwr[operator='UNMISS'](area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/operator.osm.json
osmtogeojson ./tmp/operator.osm.json > ./public/data/operator.geojson

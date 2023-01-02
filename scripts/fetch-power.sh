
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  way[power](area.a);
  way[industrial='oil'](area.a);
  way[industrial='gas'](area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/power.osm.json
osmtogeojson ./tmp/power.osm.json > ./public/data/power.geojson

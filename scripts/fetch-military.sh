
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
way[landuse='military'](area.a);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/military.osm.json
osmtogeojson ./tmp/military.osm.json > ./public/data/military.geojson

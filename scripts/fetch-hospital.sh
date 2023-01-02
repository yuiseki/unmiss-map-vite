
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
way[amenity='hospital'](area.a);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/hospital.osm.json
osmtogeojson ./tmp/hospital.osm.json > ./public/data/hospital.geojson

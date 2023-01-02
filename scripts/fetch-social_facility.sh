
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
way[social_facility](area.a);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/social_facility.osm.json
osmtogeojson ./tmp/social_facility.osm.json > ./public/data/social_facility.geojson

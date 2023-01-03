
body="
[out:json][timeout:30000];
area['name:en'='South Sudan'];
relation(area)[admin_level=2][type='boundary'][boundary='administrative']['name'];
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/boundary.osm.json
osmtogeojson ./tmp/boundary.osm.json > ./public/data/boundary.geojson

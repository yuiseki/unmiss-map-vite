
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr[amenity='shelter'](area.a);
  nwr[amenity='refugee_site'](area.a);
  nwr[emergency='assembly_point'](area.a);
  nwr[social_facility='shelter'](area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/refugee_site.osm.json
osmtogeojson ./tmp/refugee_site.osm.json > ./public/data/refugee_site.geojson

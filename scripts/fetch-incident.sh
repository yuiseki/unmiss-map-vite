# Source: https://reliefweb.int/updates?advanced-search=%28PC8657%29
# Source: https://reliefweb.int/report/south-sudan/violent-clashes-south-sudan-intensify-humanitarian-situation


body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr(id:2290290063,676500227)(area.a);
  nwr(id:243415089,691945620)(area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/incident.osm.json
osmtogeojson ./tmp/incident.osm.json > ./public/data/incident.geojson


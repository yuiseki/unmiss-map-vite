# Source: https://reliefweb.int/updates?advanced-search=%28PC8657%29
# Source: https://reliefweb.int/map/south-sudan/south-sudan-physical-access-constraints-15-dec-2022


body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr(id:22555350)(area.a);
  nwr(id:449868080)(area.a);
  nwr(id:233363765)(area.a);
  nwr(id:233363764)(area.a);

  nwr(id:237178524)(area.a);
  nwr(id:237178525)(area.a);
  nwr(id:401767871)(area.a);

);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/road_closed.osm.json
osmtogeojson ./tmp/road_closed.osm.json > ./public/data/road_closed.geojson


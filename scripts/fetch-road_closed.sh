# Source: https://reliefweb.int/updates?advanced-search=%28PC8657%29
# Source: https://reliefweb.int/map/south-sudan/south-sudan-physical-access-constraints-15-dec-2022

# highway

body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  way(id:22555350,449868080,233363765,233363764)(area.a);
  way(id:539279281,392182195,665556885,498285375,330259372,330261936)(area.a);
  way(id:237178524,237178525,401767871)(area.a);
  way(id:191509756,401765065)(area.a);
  way(id:401765064,563172691,502148345,22042737)(area.a);
  way(id:424268635,424268634,424268623,402004470)(area.a);
  way(id:291913365,420996029,291913363,420799741,420996034,420449392,420483315,254416943,22042733)(area.a);
  way(id:255109153)(area.a);
  way(id:291923999,391866209,781591831,784115276,783342144,781594914,402004407,291927904,385175780,330262624)(area.a);
  way(id:329260655)(area.a);
);
out geom;
"

curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/road_closed.osm.json
osmtogeojson ./tmp/road_closed.osm.json > ./public/data/road_closed.geojson


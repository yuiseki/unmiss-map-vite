# Source: https://reliefweb.int/updates?advanced-search=%28PC8657%29


# array of YAML file path of incidents
files=`find data/incidents/ -name "*.yml"`
echo $files

# array of osm id of incidents, extract from file name
osm_ids_arr=()
for file in $files; do
  osm_id=`basename -s .yml "${file}"`
  osm_ids_arr+=($osm_id)
done
osm_ids="$(IFS=","; echo "${osm_ids_arr[*]}")"
echo $osm_ids

# Build query for Overpass API
body="
[out:json][timeout:30000];
area['name:en'='South Sudan']->.a;
(
  nwr(id:${osm_ids})(area.a);
);
out geom;
"
echo $body

# make tmp dir
mkdir -p ./tmp/data/

# Call Overpass API
curl 'https://overpass-api.de/api/interpreter' --data-urlencode "data=${body}" > ./tmp/incidents.osm.json

# Convert OSM JSON to GeoJSON file
osmtogeojson ./tmp/incidents.osm.json > ./tmp/data/incidents.geojson

# Convert incidents YAML files to incidents JSON files
for file in $files; do
  dir=`dirname $file`
  mkdir -p ./tmp/$dir
  js-yaml $file > "./tmp/$file.json"
done

# Merge JSON files of 'array of properties of incidents'
find tmp/data/incidents/ -name "*.json" -print0 | xargs -0 cat | jq -s '[.[] | .properties]' > tmp/data/incidents_tags.json

# Extract only 'array of features' from GeoJSON and save it to JSON file
cat tmp/data/incidents.geojson | jq '.features' > tmp/data/incidents_features.json

# Extract only 'array of properties of features' from GeoJSON and save it to JSON file
cat tmp/data/incidents.geojson | jq '[.features[] | .properties]' > tmp/data/incidents_props.json

# Merge the 'array of properties of incidents' and the 'array of properties of features', group by osm id
# This step output array of objects like [{id: osm_id, properties: merged_properties}, ...]
jq -s 'map(.[])' tmp/data/incidents_props.json tmp/data/incidents_tags.json | jq '[group_by(.id)[] | add | {id:.id, properties:.} ]' > tmp/data/incidents_merged.json

# Merge 'array of features' and properties with incidents
jq -s 'map(.[])' tmp/data/incidents_features.json tmp/data/incidents_merged.json | jq '[group_by(.id)[] | add]' > tmp/data/incidents_features_merged.json

# Convert it to FeatureCollection
cat tmp/data/incidents_features_merged.json | jq -s '{"type":"FeatureCollection", "features":.[]}' > public/data/incidents.geojson

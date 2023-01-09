
area_key=`jq -r '.area | keys | .[0]' tmp/laysers.json`
echo $area_key

area_value=`jq -r ".area[\"${area_key}\"]" tmp/laysers.json`
echo $area_value

layers=`jq -r '.layers[].name' tmp/laysers.json`

for layer in $layers; do
  echo $layer
done


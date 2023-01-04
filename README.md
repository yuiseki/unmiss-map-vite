# unmiss-map-vite

## Project state

This project is in a prototype state.

The objective of this prototype is:

- To validate OSS technologies
- To validate Open Data techniques
- Conduct a feasibility study

### IMPORTANT NOTE:

- Absolutely no warranty of any kind
- To avoid "premature optimization",
  - Software architecture is intentionally dirty
  - Codes is intentionally redundant
  - Variables are intentionally hard-coded

## How to try it

- Fork this repository (Optional)
- `git clone` repository
- `npm ci`
- `make clean`
- `make`
- `npm run dev`
- Open http://localhost:5173/unmiss-map-vite/

## Requirements definition

- [x] Indicate the location of the UN-related facilities
- [x] Indicate the location of the military facilities
- [x] Indicate the location of the hospitals
- [x] Indicate the location of the government facilities
- [x] Indicate the location of oil fields and power plants
- [x] Indicate whether the road or boundary is passable
- [x] View incidents on maps
- [x] Satellite images can also be displayed
- [ ] Build and Show patrol routes on maps
- [ ] Show flood area

## TODO

- [x] Export specific POI from Overpass API and convert to GeoJSON
- [x] Show / Hide GeoJSON layers with checkbox
- [x] Support mobile devices
- [x] Switch the base tile to the satellite image
- [x] Zoom in when marker has clicked
- [x] ~~Show / Hide png layers with checkbox~~
- [x] ~~Show / Hide PMTiles layers with checkbox~~
- [ ] Add incidents editor UI
- [ ] Build and Show the patrol routes by OSRM
- [ ] Convert CSV to GeoJSON
- [ ] Convert Shapefile to GeoJSON
- [ ] Merge multiple GeoJSON files
- [ ] Watch changes of GeoJSON files and live update layers
- [ ] Try to edit GeoJSON file with QGIS and live update layers
- [ ] Support dynamically insert and live update layers
- [ ] Export POI from PostGIS


targets = \
	public/data/boundary.geojson \
	public/data/military.geojson \
	public/data/hospital.geojson \
	public/data/government.geojson \
	public/data/power.geojson

all: $(targets)

clean:
	mkdir -p tmp/data
	cp -ri public/data/* tmp/data
	rm -rf public/data/*

public/data/boundary.geojson:
	scripts/fetch-boundary.sh

public/data/military.geojson:
	scripts/fetch-military.sh

public/data/hospital.geojson:
	scripts/fetch-hospital.sh

public/data/government.geojson:
	scripts/fetch-government.sh

public/data/power.geojson:
	scripts/fetch-power.sh

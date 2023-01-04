import React, { useCallback, useState } from "react";
import "./App.css";
import { BaseMap } from "./components/BaseMap";
import { CountryBorderLayer } from "./components/Layers/CountryBorderLayer";
import { GovernmentLayer } from "./components/Layers/GovernmentLayer";
import { HospitalLayer } from "./components/Layers/HospitalLayer";
import { IncidentLayer } from "./components/Layers/IncidentLayer";
import { MilitaryLayer } from "./components/Layers/MilitaryLayer";
import { PopulationLayer } from "./components/Layers/PopulationDensityLayer";
import { PowerLayer } from "./components/Layers/PowerLayer";
import { RoadClosedLayer } from "./components/Layers/RoadClosedLayer";

function App() {
  const [incidentChecked, setIncidentChecked] = useState(true);
  const [roadClosedChecked, setRoadClosedChecked] = useState(true);
  const [militaryChecked, setMilitaryChecked] = useState(true);
  const [hospitalChecked, setHospitalChecked] = useState(false);
  const [governmentChecked, setGovernmentChecked] = useState(false);
  const [powerChecked, setPowerChecked] = useState(false);
  const [styleJsonUrl, setStyleJsonUrl] = useState<string | undefined>(
    undefined
  );

  const onChangeStyle = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStyleJsonUrl(e.target.value);
    },
    []
  );

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          position: "absolute",
          top: 0,
          height: "50px",
          width: "100%",
          maxWidth: "100%",
          overflowY: "hidden",
          overflowX: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 1000,
          fontFamily: "emoji",
        }}
      >
        <div
          style={{
            paddingLeft: "10px",
            textAlign: "center",
          }}
        >
          <img
            style={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
            src="./unopengis_logo.png"
            width={40}
            height={40}
          />
        </div>
        <div
          style={{ whiteSpace: "nowrap", paddingLeft: "10px", fontWeight: 600 }}
        >
          UNMISS Field Maps
        </div>
        <div
          style={{
            whiteSpace: "nowrap",
            paddingLeft: "20px",
          }}
        >
          🗺{" "}
          <select
            style={{
              maxWidth: "100px",
              textOverflow: "ellipsis",
            fontFamily: "emoji",
            }}
            value={styleJsonUrl}
            onChange={onChangeStyle}
          >
            <option
              value={
                "https://yuiseki.github.io/vector-tile-south-sudan/style.json"
              }
            >
              🗺 tilemaker
            </option>
            <option
              value={
                "https://tile.openstreetmap.jp/styles/osm-bright/style.json"
              }
            >
              🗺 OpenStreetMap
            </option>
            <option value={"./styles/arcgis.json"}>
              🛰 ArcGIS World Imagery
            </option>
          </select>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="incident-checkbox"
            type="checkbox"
            checked={incidentChecked}
            onChange={(e) => setIncidentChecked(e.target.checked)}
          />
          <label htmlFor="incident-checkbox"> ⚠️ Incident</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="road-closed-checkbox"
            type="checkbox"
            checked={roadClosedChecked}
            onChange={(e) => setRoadClosedChecked(e.target.checked)}
          />
          <label htmlFor="road-closed-checkbox"> 🚧 Road closed</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="military-checkbox"
            type="checkbox"
            checked={militaryChecked}
            onChange={(e) => setMilitaryChecked(e.target.checked)}
          />
          <label htmlFor="military-checkbox"> 🪖 Military</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="hospital-checkbox"
            type="checkbox"
            checked={hospitalChecked}
            onChange={(e) => setHospitalChecked(e.target.checked)}
          />
          <label htmlFor="hospital-checkbox"> 🏥 Hospital</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="government-checkbox"
            type="checkbox"
            checked={governmentChecked}
            onChange={(e) => setGovernmentChecked(e.target.checked)}
          />
          <label htmlFor="government-checkbox"> 🏢 Government</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="power-checkbox"
            type="checkbox"
            checked={powerChecked}
            onChange={(e) => setPowerChecked(e.target.checked)}
          />
          <label htmlFor="power-checkbox"> 💡 Power</label>
        </div>
        <div style={{ whiteSpace: "nowrap", paddingLeft: "15px" }}>
          <input
            id="flood-checkbox"
            type="checkbox"
            disabled={true}
            checked={false}
          />
          <label htmlFor="flood-checkbox"> 🌊 Flood</label>
        </div>
      </div>
      <BaseMap
        latitude={7.825}
        longitude={31.274}
        zoom={6}
        style={styleJsonUrl}
      >
        <CountryBorderLayer />
        {roadClosedChecked && <RoadClosedLayer />}
        {incidentChecked && <IncidentLayer />}
        {militaryChecked && <MilitaryLayer />}
        {hospitalChecked && <HospitalLayer />}
        {governmentChecked && <GovernmentLayer />}
        {powerChecked && <PowerLayer />}
      </BaseMap>
    </div>
  );
}

export default App;

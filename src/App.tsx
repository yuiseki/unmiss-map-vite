import { useState } from "react";
import "./App.css";
import { BaseMap } from "./components/BaseMap";
import { CountryBorderLayer } from "./components/Layers/CountryBorderLayer";
import { GovernmentLayer } from "./components/Layers/GovernmentLayer";
import { HospitalLayer } from "./components/Layers/HospitalLayer";
import { MilitaryLayer } from "./components/Layers/MilitaryLayer";
import { PowerLayer } from "./components/Layers/PowerLayer";

function App() {
  const [militaryChecked, setMilitaryChecked] = useState(true);
  const [hospitalChecked, setHospitalChecked] = useState(false);
  const [governmentChecked, setGovernmentChecked] = useState(false);
  const [powerChecked, setPowerChecked] = useState(false);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: 0,
          height: "50px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 100,
          fontFamily: "emoji",
        }}
      >
        <div style={{ paddingLeft: "20px", fontWeight: 600 }}>
          UNMISS Field Maps
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="military-checkbox"
            type="checkbox"
            checked={militaryChecked}
            onChange={(e) => setMilitaryChecked(e.target.checked)}
          />
          <label htmlFor="military-checkbox"> 🪖 Military</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="hospital-checkbox"
            type="checkbox"
            checked={hospitalChecked}
            onChange={(e) => setHospitalChecked(e.target.checked)}
          />
          <label htmlFor="hospital-checkbox"> 🏥 Hospital</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="government-checkbox"
            type="checkbox"
            checked={governmentChecked}
            onChange={(e) => setGovernmentChecked(e.target.checked)}
          />
          <label htmlFor="government-checkbox"> 🏢 Government</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="power-checkbox"
            type="checkbox"
            checked={powerChecked}
            onChange={(e) => setPowerChecked(e.target.checked)}
          />
          <label htmlFor="power-checkbox"> 💡 Power</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="road-closed-checkbox"
            type="checkbox"
            disabled={true}
            checked={false}
          />
          <label htmlFor="load-closed-checkbox"> 🚧 Road closed</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="incident-checkbox"
            type="checkbox"
            disabled={true}
            checked={false}
          />
          <label htmlFor="incident-checkbox"> ⚠️ Incident</label>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <input
            id="flood-checkbox"
            type="checkbox"
            disabled={true}
            checked={false}
          />
          <label htmlFor="flood-checkbox"> 🌊 Flood</label>
        </div>
      </div>
      <BaseMap latitude={7.825} longitude={31.274} zoom={6}>
        <CountryBorderLayer />
        {militaryChecked && <MilitaryLayer />}
        {hospitalChecked && <HospitalLayer />}
        {governmentChecked && <GovernmentLayer />}
        {powerChecked && <PowerLayer />}
      </BaseMap>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { BaseMap } from "./components/BaseMap";
import { CountryBorderLayer } from "./components/Layers/CountryBorderLayer";
import { HospitalLayer } from "./components/Layers/HospitalLayer";
import { MilitaryLayer } from "./components/Layers/MilitaryLayer";

function App() {
  const [militaryChecked, setMilitaryChecked] = useState(true);
  const [hospitalChecked, setHospitalChecked] = useState(true);

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
            disabled={true}
            checked={false}
          />
          <label htmlFor="government-checkbox"> 🏢 Government</label>
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
      </div>
      <BaseMap latitude={4.8426} longitude={31.5945} zoom={12}>
        <CountryBorderLayer />
        {militaryChecked && <MilitaryLayer />}
        {hospitalChecked && <HospitalLayer />}
      </BaseMap>
    </div>
  );
}

export default App;

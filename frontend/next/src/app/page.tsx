import React from "react";

const CarbonIntensityPage = () => {
  // Placeholder data - replace with actual API call
  const last24HoursData = [
    { time: "2025-05-21 10:00", intensity: 150 },
    { time: "2025-05-21 11:00", intensity: 160 },
    // ... more data
  ];

  const next24HoursPrediction = [
    { time: "2025-05-22 10:00", intensity: 140 },
    { time: "2025-05-22 11:00", intensity: 135 },
    // ... more data
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Carbon Intensity - Portugal</h1>

      <section style={{ marginBottom: "40px" }}>
        <h2>Last 24 Hours</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {last24HoursData.map((data) => (
            <div
              key={data.time}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginRight: "10px",
                minWidth: "150px",
              }}
            >
              <p>
                <strong>Time:</strong> {data.time}
              </p>
              <p>
                <strong>Intensity:</strong> {data.intensity} gCO2/kWh
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Next 24 Hours (Prediction)</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {next24HoursPrediction.map((data) => (
            <div
              key={data.time}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginRight: "10px",
                minWidth: "150px",
              }}
            >
              <p>
                <strong>Time:</strong> {data.time}
              </p>
              <p>
                <strong>Intensity:</strong> {data.intensity} gCO2/kWh
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarbonIntensityPage;

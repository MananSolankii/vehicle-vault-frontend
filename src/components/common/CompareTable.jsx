// CompareTable.jsx
import React from "react";
import "../../assets/css/ComparePage.css"; // Reuse existing styling

const booleanIcon = (val) => (val ? "✅" : "❌");

const CompareTable = ({ cars }) => {
  const attributes = [
    "brand", "name", "model", "price", "fuel_type", "mileage", "engine", "transmission",
    "seating_capacity", "body_type", "airbags", "abs", "ebd", "brake_assist",
    "rear_parking_sensors", "rear_camera", "cruise_control", "sunroof", "wireless_charging",
    "infotainment_system", "touchscreen", "android_auto", "apple_carplay", "bluetooth",
    "usb_ports", "aux_input", "navigation_system", "voice_control", "climate_control",
    "power_windows", "power_steering", "keyless_entry", "push_start", "alloy_wheels",
    "fog_lamps", "daytime_running_lights"
  ];

  const isBoolean = (key) => {
    const booleanKeys = [
      "abs", "ebd", "brake_assist", "rear_parking_sensors", "rear_camera",
      "cruise_control", "sunroof", "wireless_charging", "touchscreen",
      "android_auto", "apple_carplay", "bluetooth", "usb_ports", "aux_input",
      "navigation_system", "voice_control", "climate_control", "power_windows",
      "power_steering", "keyless_entry", "push_start", "alloy_wheels",
      "fog_lamps", "daytime_running_lights"
    ];
    return booleanKeys.includes(key);
  };

  return (
    <div className="compare-page">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {cars.map((car, index) => (
              <th key={index}>{car.brand} {car.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr}>
              <td style={{ textTransform: "capitalize" }}>{attr.replaceAll("_", " ")}</td>
              {cars.map((car, index) => (
                <td key={index}>
                  {isBoolean(attr) ? booleanIcon(car[attr]) : car[attr] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
import { useState, useEffect } from "react";

export default function ClockDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div style={{
      background: "rgba(0,0,0,0.3)",
      borderRadius: 16,
      padding: "16px 28px",
      marginBottom: 28,
      display: "inline-block",
    }}>
      <span style={{ fontSize: 52, fontWeight: 700, color: "#f9ca24", letterSpacing: 4 }}>
        {hh}:{mm}
      </span>
      <span style={{ fontSize: 26, color: "#aaa", marginLeft: 6 }}>
        {ss}
      </span>
    </div>
  );
}
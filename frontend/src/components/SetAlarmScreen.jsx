import { useState } from "react";
import ClockDisplay from "./ClockDisplay";

export default function SetAlarmScreen({ onSet }) {
  const [time,  setTime]  = useState("");
  const [saved, setSaved] = useState("");

  function handleSet() {
    if (!time) return alert("Please pick a time!");
    setSaved(time);
    onSet(time);
  }

  return (
    <div style={styles.card}>
      <div style={{ fontSize: 56, marginBottom: 8 }}>⏰</div>
      <h1 style={styles.title}>Puzzle Alarm</h1>
      <p style={styles.subtitle}>Solve a puzzle to turn it off — no cheating!</p>
      <ClockDisplay />
      <div style={styles.row}>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={styles.timeInput}
        />
        <button onClick={handleSet} style={styles.btn}>Set Alarm</button>
      </div>
      {saved && (
        <div style={styles.badge}>
          ✅ Alarm set for <strong>{saved}</strong>
        </div>
      )}
    </div>
  );
}

const styles = {
  card:      { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "40px 36px", maxWidth: 420, width: "100%", textAlign: "center", color: "#fff" },
  title:     { fontSize: 28, fontWeight: 700, color: "#f9ca24", margin: 0 },
  subtitle:  { color: "#bbb", fontSize: 14, marginTop: 6, marginBottom: 24 },
  row:       { display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 },
  timeInput: { padding: "12px 16px", borderRadius: 12, border: "none", fontSize: 18, background: "#fff", color: "#333", outline: "none" },
  btn:       { padding: "12px 24px", borderRadius: 12, border: "none", background: "#f9ca24", color: "#1a1a2e", fontWeight: 700, fontSize: 16, cursor: "pointer" },
  badge:     { background: "rgba(107,203,119,0.15)", border: "1px solid #6bcb77", color: "#6bcb77", borderRadius: 10, padding: "10px 16px", fontSize: 14 },
};
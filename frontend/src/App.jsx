import { useState, useRef } from "react";
import SetAlarmScreen from "./components/SetAlarmScreen";
import RingingScreen from "./components/RingingScreen";
import useAlarmSound from "./utils/useAlarmSound";
import "./App.css";

export default function App() {
  const [ringing, setRinging] = useState(false);
  const timerRef = useRef(null);
  const { start, stop } = useAlarmSound();

  function handleSetAlarm(time) {
    if (!time) return;
    if (timerRef.current) clearInterval(timerRef.current);

    console.log("Alarm set for:", time);

    timerRef.current = setInterval(() => {
      const now = new Date();
      const hh  = String(now.getHours()).padStart(2, "0");
      const mm  = String(now.getMinutes()).padStart(2, "0");
      const current = `${hh}:${mm}`;
      console.log("Checking:", current, "vs", time);

      if (current === time) {
        clearInterval(timerRef.current);
        start();
        setRinging(true);
      }
    }, 1000);
  }

  function handleSolved() {
    stop();
    setRinging(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      {ringing
        ? <RingingScreen onSolve={handleSolved} />
        : <SetAlarmScreen onSet={handleSetAlarm} />
      }
    </div>
  );
}
import { useState, useRef } from "react";
import SetAlarmScreen from "./components/SetAlarmScreen";
import RingingScreen from "./components/RingingScreen";
import useAlarmSound from "./utils/useAlarmSound";

export default function App() {
  const [ringing, setRinging] = useState(false);
  const timerRef = useRef(null);
  const { start, stop } = useAlarmSound();

  function handleSetAlarm(time) {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = new Date();
      const hh  = String(now.getHours()).padStart(2, "0");
      const mm  = String(now.getMinutes()).padStart(2, "0");
      if (`${hh}:${mm}` === time) {
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
    <div>
      {ringing
        ? <RingingScreen onSolve={handleSolved} />
        : <SetAlarmScreen onSet={handleSetAlarm} />
      }
    </div>
  );
}
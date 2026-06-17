import { useState } from "react";
import { getRandomPuzzle } from "../utils/puzzles";
import PuzzleBox from "./PuzzleBox";

export default function RingingScreen({ onSolve }) {
  const [puzzle] = useState(getRandomPuzzle);

  return (
    <div style={styles.card}>
      <div className="bell">🔔</div>
      <h2 style={styles.title}>WAKE UP!</h2>
      <p style={styles.subtitle}>Solve the puzzle to stop the alarm</p>
      <PuzzleBox puzzle={puzzle} onCorrect={onSolve} />
    </div>
  );
}

const styles = {
  card:     { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,100,100,0.3)", borderRadius: 24, padding: "36px 28px", maxWidth: 440, width: "100%", textAlign: "center", color: "#fff" },
  title:    { fontSize: 32, fontWeight: 800, color: "#ff6b6b", margin: "12px 0 4px" },
  subtitle: { color: "#ccc", fontSize: 14, marginBottom: 24 },
};
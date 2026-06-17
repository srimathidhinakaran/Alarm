import { useState } from "react";
import checkAnswer from "../utils/checkAnswer";

export default function PuzzleBox({ puzzle, onCorrect }) {
  const [mathInput,    setMathInput]    = useState("");
  const [selectedOpt,  setSelectedOpt]  = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [message,      setMessage]      = useState("");
  const [shake,        setShake]        = useState(false);

  function toggleImg(i) {
    setSelectedImgs(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  }

  function submit() {
    const correct = checkAnswer(puzzle, mathInput || selectedOpt, selectedImgs);
    if (correct) {
      setMessage("✅ Correct! Turning off alarm...");
      setTimeout(onCorrect, 1000);
    } else {
      setMessage("❌ Wrong answer! Try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className={shake ? "shake" : ""} style={styles.box}>
      <p style={styles.question}>{puzzle.question}</p>

      {puzzle.type === "math" && (
        <input
          autoFocus
          type="number"
          placeholder="Your answer..."
          value={mathInput}
          onChange={e => setMathInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={styles.mathInput}
        />
      )}

      {puzzle.type === "odd_one_out" && (
        <div style={styles.optionGrid}>
          {puzzle.options.map(opt => (
            <button key={opt} onClick={() => setSelectedOpt(opt)}
              style={{ ...styles.optionBtn, ...(selectedOpt === opt ? styles.optionSelected : {}) }}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {puzzle.type === "image_click" && (
        <div style={styles.imageGrid}>
          {puzzle.images.map((img, i) => (
            <button key={i} onClick={() => toggleImg(i)}
              style={{ ...styles.imageCard, ...(selectedImgs.includes(i) ? styles.imageSelected : {}) }}>
              {img.label}
            </button>
          ))}
        </div>
      )}

      <button onClick={submit} style={styles.submitBtn}>Submit Answer</button>

      {message && (
        <p style={{ ...styles.message, color: message.startsWith("✅") ? "#6bcb77" : "#ff6b6b" }}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  box:            { background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: 24 },
  question:       { fontSize: 20, fontWeight: 700, color: "#f9ca24", marginBottom: 20 },
  mathInput:      { width: "100%", padding: "12px 16px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 20, textAlign: "center", outline: "none", marginBottom: 16, boxSizing: "border-box" },
  optionGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 },
  optionBtn:      { padding: "14px 10px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, cursor: "pointer" },
  optionSelected: { background: "#f9ca24", color: "#1a1a2e", border: "2px solid #f9ca24", fontWeight: 700 },
  imageGrid:      { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 },
  imageCard:      { fontSize: 36, padding: 14, borderRadius: 12, border: "2px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", cursor: "pointer" },
  imageSelected:  { border: "2px solid #f9ca24", background: "rgba(249,202,36,0.2)", transform: "scale(1.08)" },
  submitBtn:      { width: "100%", padding: 14, borderRadius: 12, border: "none", background: "#f9ca24", color: "#1a1a2e", fontWeight: 700, fontSize: 16, cursor: "pointer" },
  message:        { marginTop: 14, fontSize: 16, fontWeight: 600 },
};
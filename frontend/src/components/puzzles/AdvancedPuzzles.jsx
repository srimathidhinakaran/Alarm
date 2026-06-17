import { useEffect, useState } from "react";

export function GridTap({ puzzle, onChange }) {
  const [selected, setSelected] = useState([]);

  function toggle(i) {
    setSelected(prev => {
      const next = prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i];
      onChange && onChange(next);
      return next;
    });
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
      {puzzle.items.map((it, i) => (
        <button key={i} onClick={() => toggle(i)}
          style={{
            padding: 14,
            borderRadius: 10,
            fontSize: 22,
            cursor: "pointer",
            background: selected.includes(i) ? "#f9ca24" : "rgba(255,255,255,0.06)",
            color: selected.includes(i) ? "#1a1a2e" : "#fff",
            border: selected.includes(i) ? "2px solid #f9ca24" : "2px solid rgba(255,255,255,0.08)"
          }}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function ShadowMatch({ puzzle, onChange }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => onChange && onChange(chosen), [chosen]);

  return (
    <div>
      <div style={{ marginBottom: 12 }}><strong>Shadow:</strong> {puzzle.shadow}</div>
      <div style={{ display: "flex", gap: 10 }}>
        {puzzle.options.map((o, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <button onClick={() => setChosen(o.label)}
              style={{ padding: 12, borderRadius: 8, background: chosen === o.label ? "#f9ca24" : "rgba(255,255,255,0.06)", color: chosen === o.label ? "#1a1a2e" : "#fff", border: "2px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
              {o.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FillMissing({ puzzle, onChange }) {
  const [choice, setChoice] = useState(null);
  useEffect(() => onChange && onChange(choice), [choice]);

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <strong>Pattern:</strong>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {puzzle.sequence.map((s, i) => (
            <div key={i} style={{ padding: 12, minWidth: 44, borderRadius: 8, background: s ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)", textAlign: "center" }}>{s || "?"}</div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {puzzle.options.map((o, i) => (
          <button key={i} onClick={() => setChoice(o)} style={{ padding: 12, borderRadius: 8, background: choice === o ? "#f9ca24" : "rgba(255,255,255,0.06)", color: choice === o ? "#1a1a2e" : "#fff", border: "2px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

export function ColorMixer({ puzzle, onChange }) {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => onChange && onChange({ r, g, b }), [r, g, b]);

  function toHex() {
    const h = (n) => n.toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}`;
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}><strong>Target</strong>: <span style={{ display: "inline-block", width: 36, height: 18, background: puzzle.target, borderRadius: 4, marginLeft: 8 }} /></div>
      <div style={{ display: "grid", gap: 8 }}>
        <label>R <input type="range" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} /></label>
        <label>G <input type="range" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} /></label>
        <label>B <input type="range" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} /></label>
      </div>
      <div style={{ marginTop: 10 }}>Current: <span style={{ display: "inline-block", width: 36, height: 18, background: toHex(), borderRadius: 4, marginLeft: 8 }} /> {toHex()}</div>
    </div>
  );
}

export function EmojiMashup({ puzzle, onChange }) {
  const [text, setText] = useState("");
  useEffect(() => onChange && onChange(text), [text]);

  return (
    <div>
      <div style={{ marginBottom: 12 }}>Emojis: <span style={{ fontSize: 24 }}>{puzzle.emojis.join(" ")}</span></div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type the answer" style={{ padding: 10, borderRadius: 8, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

export function getRenderer(type) {
  const map = {
    grid_tap: GridTap,
    shadow_match: ShadowMatch,
    fill_missing: FillMissing,
    color_mixer: ColorMixer,
    emoji_mashup: EmojiMashup,
    memory_flip: MemoryFlip,
    sliding_tile: SlidingTile,
    line_draw: LineDraw,
  };
  return map[type] || null;
}

// --- New interactive games ---
export function MemoryFlip({ puzzle, onChange }) {
  const [phase, setPhase] = useState("show");
  const [highlight, setHighlight] = useState(-1);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const seq = puzzle.sequence || [];
    if (!seq.length) { setPhase("play"); return; }
    setPhase("show");
    let t = 0;
    seq.forEach((pos, i) => {
      setTimeout(() => setHighlight(pos), t + 400);
      setTimeout(() => setHighlight(-1), t + 700);
      t += 800;
    });
    setTimeout(() => { setPhase("play"); }, t + 200);
  }, [puzzle.sequence]);

  function clickTile(i) {
    if (phase !== "play") return;
    const next = [...user, i];
    setUser(next);
    onChange && onChange(next);
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,64px)", gap: 8 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <button key={i} onClick={() => clickTile(i)}
            style={{ width: 64, height: 64, borderRadius: 8, background: highlight === i ? "#f9ca24" : "rgba(255,255,255,0.06)", color: "#fff", border: "2px solid rgba(255,255,255,0.08)" }}>
            {phase === "show" && highlight === i ? "●" : ""}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>Your sequence: {user.join(",")}</div>
    </div>
  );
}

export function SlidingTile({ puzzle, onChange }) {
  // puzzle.board: array length 9 with numbers 1..8 and 0 for empty
  const initial = puzzle.board || [1,2,3,4,5,6,7,8,0];
  const [board, setBoard] = useState(initial);

  useEffect(() => onChange && onChange(board), [board]);

  function canSwap(i,j){
    const ri=Math.floor(i/3), rj=Math.floor(j/3), ci=i%3, cj=j%3;
    return (Math.abs(ri-rj)+Math.abs(ci-cj))===1;
  }

  function clickTile(i){
    const zi = board.indexOf(0);
    if(canSwap(i,zi)){
      const b = [...board];
      [b[i], b[zi]] = [b[zi], b[i]];
      setBoard(b);
    }
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,80px)", gap: 8 }}>
        {board.map((v,i)=> (
          <button key={i} onClick={()=>clickTile(i)} style={{ width:80,height:80,borderRadius:8, background: v===0?"transparent":"rgba(255,255,255,0.06)", color: "#fff", border: "2px solid rgba(255,255,255,0.08)", fontSize:20 }}>
            {v===0?"":v}
          </button>
        ))}
      </div>
      <div style={{ marginTop:8 }}>Board: {board.join(",")}</div>
    </div>
  );
}

export function LineDraw({ puzzle, onChange }) {
  const dots = puzzle.dots || [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}];
  const [seq,setSeq] = useState([]);
  function clickDot(i){
    setSeq(s=>{const next=[...s,i]; onChange && onChange(next); return next;});
  }

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns: `repeat(${Math.max(...dots.map(d=>d.x))+1},64px)`, gap:8 }}>
        {dots.map((d,i)=> (
          <button key={i} onClick={()=>clickDot(i)} style={{ width:64,height:64,borderRadius:32, background:"rgba(255,255,255,0.06)", color:"#fff", border:"2px solid rgba(255,255,255,0.08)" }}>{i+1}</button>
        ))}
      </div>
      <div style={{ marginTop:8 }}>Sequence: {seq.join(",")}</div>
    </div>
  );
}

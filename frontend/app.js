const API = "http://localhost:3000/api";
let alarmInterval = null;
let puzzle = null;
let selectedImages = [];
let selectedOption = null;
let audioCtx = null;
let beepInterval = null;

// ─── ALARM SOUND ─────────────────────────────────────────
function startAlarmSound() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  beepInterval = setInterval(() => {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.4);
  }, 600);
}

function stopAlarmSound() {
  if (beepInterval) { clearInterval(beepInterval); beepInterval = null; }
  if (audioCtx)     { audioCtx.close(); audioCtx = null; }
}

// ─── SET ALARM ───────────────────────────────────────────
function setAlarm() {
  const timeInput = document.getElementById("alarm-time").value;
  if (!timeInput) return alert("Please pick a time!");
  if (alarmInterval) clearInterval(alarmInterval);

  document.getElementById("alarm-status").textContent = `⏰ Alarm set for ${timeInput}`;

  alarmInterval = setInterval(() => {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, "0");
    const mm  = String(now.getMinutes()).padStart(2, "0");
    if (`${hh}:${mm}` === timeInput) {
      clearInterval(alarmInterval);
      triggerAlarm();
    }
  }, 1000);
}

// ─── TRIGGER ALARM ───────────────────────────────────────
async function triggerAlarm() {
  startAlarmSound();
  document.getElementById("alarm-setter").classList.add("hidden");
  document.getElementById("alarm-screen").classList.remove("hidden");
  document.getElementById("result-message").textContent = "";

  try {
    const res = await fetch(`${API}/puzzle`);
    puzzle = await res.json();
    console.log("Received puzzle:", puzzle);
    renderPuzzle(puzzle);
  } catch (err) {
    document.getElementById("puzzle-container").innerHTML =
      "<p style='color:red'>❌ Cannot connect to backend. Run: node server.js</p>";
  }
}

// ─── RENDER PUZZLE ───────────────────────────────────────
function renderPuzzle(p) {
  const container = document.getElementById("puzzle-container");
  selectedImages  = [];
  selectedOption  = null;
  container.innerHTML = `<h3>${p.question}</h3>`;

  if (p.type === "math") {
    container.innerHTML += `
      <input type="text" id="math-answer" placeholder="Type your answer..." />
      <button onclick="submitAnswer()">Submit</button>
    `;
    // Allow Enter key
    setTimeout(() => {
      const inp = document.getElementById("math-answer");
      if (inp) inp.addEventListener("keydown", e => { if (e.key === "Enter") submitAnswer(); });
    }, 100);

  } else if (p.type === "odd_one_out") {
    const btns = p.options.map(opt =>
      `<button class="option-btn" onclick="selectOption(this,'${opt}')">${opt}</button>`
    ).join("");
    container.innerHTML += `<div>${btns}</div><button onclick="submitAnswer()">Submit</button>`;

  } else if (p.type === "image_click") {
    const cards = p.images.map((img, i) =>
      `<div class="image-card" data-index="${i}" onclick="toggleImage(this,${i})">${img.label}</div>`
    ).join("");
    container.innerHTML += `<div class="image-grid">${cards}</div><button onclick="submitAnswer()">Submit</button>`;
  }
}

// ─── INTERACTIONS ─────────────────────────────────────────
function selectOption(btn, value) {
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedOption = value;
}

function toggleImage(card, index) {
  card.classList.toggle("selected");
  if (selectedImages.includes(index)) {
    selectedImages = selectedImages.filter(i => i !== index);
  } else {
    selectedImages.push(index);
  }
  console.log("Selected image indexes:", selectedImages);
}

// ─── SUBMIT ANSWER ────────────────────────────────────────
async function submitAnswer() {
  const resultEl = document.getElementById("result-message");
  let answer;

  if (puzzle.type === "math") {
    answer = document.getElementById("math-answer").value.trim();
    if (!answer) { resultEl.textContent = "⚠️ Please type an answer!"; return; }

  } else if (puzzle.type === "odd_one_out") {
    if (!selectedOption) { resultEl.textContent = "⚠️ Please select an option!"; return; }
    answer = selectedOption;

  } else if (puzzle.type === "image_click") {
    if (selectedImages.length === 0) { resultEl.textContent = "⚠️ Please select images!"; return; }
    answer = selectedImages;
  }

  console.log("Submitting — puzzleId:", puzzle.id, "| answer:", answer);

  try {
    const res  = await fetch(`${API}/check`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ puzzleId: puzzle.id, answer })
    });
    const data = await res.json();
    console.log("Server response:", data);
    resultEl.textContent = data.message;

    if (data.correct) {
      stopAlarmSound();
      setTimeout(() => {
        document.getElementById("alarm-screen").classList.add("hidden");
        document.getElementById("alarm-setter").classList.remove("hidden");
        document.getElementById("alarm-status").textContent = "✅ Good morning! Alarm dismissed.";
        resultEl.textContent = "";
      }, 1500);
    }
  } catch (err) {
    resultEl.textContent = "❌ Server not reachable. Is backend running on port 3000?";
  }
}
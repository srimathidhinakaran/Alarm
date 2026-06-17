const express = require("express");
const cors = require("cors");
const { getRandomPuzzle, puzzles } = require("./puzzles");

const app = express();
app.use(cors());
app.use(express.json());

// GET a random puzzle
app.get("/api/puzzle", (req, res) => {
  const puzzle = getRandomPuzzle();
  console.log("Sending puzzle:", puzzle.id, puzzle.type, "| answer:", puzzle.answer || "image_click");
  res.json(puzzle);
});

// POST check answer
app.post("/api/check", (req, res) => {
  const { puzzleId, answer } = req.body;
  console.log("Check request — puzzleId:", puzzleId, "| answer:", answer);

  // Find the puzzle by ID from master list
  const puzzle = puzzles.find(p => p.id === Number(puzzleId));
  if (!puzzle) {
    console.log("Puzzle not found for id:", puzzleId);
    return res.json({ correct: false, message: "❌ Puzzle not found!" });
  }

  // ── IMAGE CLICK ──────────────────────────────────────
  if (puzzle.type === "image_click") {
    const correctIndexes = puzzle.images
      .map((img, i) => img.isCorrect ? i : null)
      .filter(i => i !== null)
      .sort((a, b) => a - b);

    const userIndexes = (Array.isArray(answer) ? answer : [])
      .map(Number)
      .sort((a, b) => a - b);

    console.log("Correct indexes:", correctIndexes, "| User indexes:", userIndexes);
    const correct = JSON.stringify(correctIndexes) === JSON.stringify(userIndexes);
    return res.json({
      correct,
      message: correct
        ? "✅ Correct! Alarm OFF!"
        : `❌ Wrong! You need to select ${correctIndexes.length} image(s). Try again.`
    });
  }

  // ── MATH & ODD ONE OUT ───────────────────────────────
  const correctAnswer = String(puzzle.answer).trim().toLowerCase();
  const userAnswer    = String(answer).trim().toLowerCase();
  console.log("Correct answer:", correctAnswer, "| User answer:", userAnswer);

  const correct = correctAnswer === userAnswer;
  res.json({
    correct,
    message: correct
      ? "✅ Correct! Alarm OFF!"
      : `❌ Wrong! Try again.`
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
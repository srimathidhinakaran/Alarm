export default function checkAnswer(puzzle, userAnswer, selectedIndexes) {
  if (puzzle.type === "math" || puzzle.type === "odd_one_out") {
    return (
      String(userAnswer).trim().toLowerCase() ===
      String(puzzle.answer).trim().toLowerCase()
    );
  }

  if (puzzle.type === "image_click") {
    const correct = puzzle.images
      .map((img, i) => (img.isCorrect ? i : null))
      .filter((i) => i !== null)
      .sort((a, b) => a - b);

    const user = [...selectedIndexes].sort((a, b) => a - b);
    return JSON.stringify(correct) === JSON.stringify(user);
  }

  // grid_tap behaves like image_click but uses puzzle.items
  if (puzzle.type === "grid_tap") {
    const correct = puzzle.items
      .map((it, i) => (it.isCorrect ? i : null))
      .filter((i) => i !== null)
      .sort((a, b) => a - b);
    const user = [...selectedIndexes].sort((a, b) => a - b);
    return JSON.stringify(correct) === JSON.stringify(user);
  }

  if (puzzle.type === "shadow_match") {
    if (!userAnswer) return false;
    return String(userAnswer).trim().toLowerCase() === String(puzzle.answer).trim().toLowerCase();
  }

  if (puzzle.type === "fill_missing") {
    if (!userAnswer) return false;
    return String(userAnswer).trim().toLowerCase() === String(puzzle.answer).trim().toLowerCase();
  }

  if (puzzle.type === "color_mixer") {
    if (!userAnswer || typeof userAnswer !== "object") return false;
    // puzzle.target can be a hex string e.g. "#aabbcc" or rgb object
    const parseHex = (h) => {
      if (!h || h[0] !== "#") return null;
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      return { r, g, b };
    };
    const target = typeof puzzle.target === "string" ? parseHex(puzzle.target) : puzzle.target;
    if (!target) return false;
    const dr = target.r - (userAnswer.r || 0);
    const dg = target.g - (userAnswer.g || 0);
    const db = target.b - (userAnswer.b || 0);
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    // allow some tolerance
    return dist <= (puzzle.tolerance || 60);
  }

  if (puzzle.type === "emoji_mashup") {
    if (!userAnswer) return false;
    return String(userAnswer).trim().toLowerCase() === String(puzzle.answer).trim().toLowerCase();
  }

  if (puzzle.type === "memory_flip") {
    if (!selectedIndexes || !Array.isArray(selectedIndexes)) return false;
    const target = puzzle.sequence || [];
    return JSON.stringify(selectedIndexes) === JSON.stringify(target);
  }

  if (puzzle.type === "sliding_tile") {
    // selectedIndexes passed as board state
    const board = Array.isArray(selectedIndexes) ? selectedIndexes : [];
    if (!board.length) return false;
    // solved state is 1..8,0
    const solved = [1,2,3,4,5,6,7,8,0];
    return JSON.stringify(board) === JSON.stringify(solved);
  }

  if (puzzle.type === "line_draw") {
    // selectedIndexes is the drawn sequence
    const seq = selectedIndexes || [];
    const target = puzzle.answerSequence || [];
    return JSON.stringify(seq) === JSON.stringify(target);
  }

  return false;
}
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

  return false;
}
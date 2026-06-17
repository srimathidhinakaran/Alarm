const PUZZLES = [
  { id: 1,  type: "math", question: "49 ÷ 7 = ?",   answer: "7"   },
  { id: 2,  type: "math", question: "15 × 3 = ?",   answer: "45"  },
  { id: 3,  type: "math", question: "√144 = ?",      answer: "12"  },
  { id: 4,  type: "math", question: "8² - 14 = ?",   answer: "50"  },
  { id: 5,  type: "math", question: "100 - 37 = ?",  answer: "63"  },
  { id: 6,  type: "math", question: "9 × 9 = ?",     answer: "81"  },
  { id: 7,  type: "math", question: "256 ÷ 4 = ?",   answer: "64"  },
  { id: 8,  type: "math", question: "17 × 4 = ?",    answer: "68"  },
  { id: 9,  type: "math", question: "33 + 67 = ?",   answer: "100" },
  { id: 10, type: "math", question: "121 ÷ 11 = ?",  answer: "11"  },
  { id: 11, type: "math", question: "7³ = ?",         answer: "343" },

  { id: 12, type: "odd_one_out", question: "Which is the odd one out?", options: ["Apple","Mango","Carrot","Banana"],      answer: "Carrot"     },
  { id: 13, type: "odd_one_out", question: "Which is the odd one out?", options: ["Rose","Tulip","Lotus","Tomato"],        answer: "Tomato"     },
  { id: 14, type: "odd_one_out", question: "Which is the odd one out?", options: ["Dog","Cat","Eagle","Rabbit"],           answer: "Eagle"      },
  { id: 15, type: "odd_one_out", question: "Which is the odd one out?", options: ["Piano","Guitar","Violin","Television"], answer: "Television" },
  { id: 16, type: "odd_one_out", question: "Which is the odd one out?", options: ["Mercury","Venus","Sun","Mars"],         answer: "Sun"        },
  { id: 17, type: "odd_one_out", question: "Which is the odd one out?", options: ["Cobra","Python","Eagle","Viper"],       answer: "Eagle"      },

  {
    id: 18, type: "image_click",
    question: "Tap all the ☀️ SUNS",
    images: [
      { label: "☀️", isCorrect: true  }, { label: "🌙", isCorrect: false },
      { label: "☀️", isCorrect: true  }, { label: "⭐", isCorrect: false },
      { label: "☀️", isCorrect: true  }, { label: "🌧️", isCorrect: false },
    ],
  },
  {
    id: 19, type: "image_click",
    question: "Tap all the 🍎 FRUITS",
    images: [
      { label: "🍎", isCorrect: true  }, { label: "🚗", isCorrect: false },
      { label: "🍌", isCorrect: true  }, { label: "✏️", isCorrect: false },
      { label: "🍇", isCorrect: true  }, { label: "📱", isCorrect: false },
    ],
  },
  {
    id: 20, type: "image_click",
    question: "Tap all the 🚗 VEHICLES",
    images: [
      { label: "🚗", isCorrect: true  }, { label: "🍕", isCorrect: false },
      { label: "✈️", isCorrect: true  }, { label: "🌵", isCorrect: false },
      { label: "🚢", isCorrect: true  }, { label: "📚", isCorrect: false },
    ],
  },
  // New advanced puzzles
  {
    id: 21, type: "grid_tap",
    question: "Select all the citrus fruits!",
    items: [
      { label: "🍎", isCorrect: false }, { label: "🍋", isCorrect: true }, { label: "🍊", isCorrect: true }, { label: "🍌", isCorrect: false },
      { label: "🍐", isCorrect: false }, { label: "🍊", isCorrect: true }, { label: "🍓", isCorrect: false }, { label: "🍋", isCorrect: true },
      { label: "🍇", isCorrect: false }, { label: "🍈", isCorrect: false }, { label: "🍊", isCorrect: true }, { label: "🍒", isCorrect: false },
      { label: "🍋", isCorrect: true }, { label: "🍍", isCorrect: false }, { label: "🥭", isCorrect: false }, { label: "🍊", isCorrect: true },
    ],
  },
  {
    id: 22, type: "shadow_match",
    question: "Match the shadow to the object",
    shadow: "🔔 (silhouette)",
    options: [ { label: "🔔" }, { label: "📦" }, { label: "🍎" }, { label: "🚗" } ],
    answer: "🔔",
  },
  {
    id: 23, type: "fill_missing",
    question: "Complete the pattern",
    sequence: ["🔴", "🟢", null],
    options: ["🔴","🟢","🔵"],
    answer: "🔴",
  },
  {
    id: 24, type: "math",
    question: "14 + 9 = ?",
    answer: "23",
  },
  {
    id: 25, type: "emoji_mashup",
    question: "What word do these emojis represent?",
    emojis: ["🐒","🍌","🌴"],
    answer: "monkey",
  },
  {
    id: 26, type: "memory_flip",
    question: "Watch the sequence and repeat it",
    sequence: [0,1,4,7],
  },
  {
    id: 27, type: "sliding_tile",
    question: "Reorder the tiles to solve",
    board: [1,2,3,4,5,6,0,7,8],
  },
];

let dynamicIdCounter = 1000;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeMathPuzzle() {
  const ops = ["+", "-", "×"];
  const op = ops[randInt(0, ops.length - 1)];
  let a = randInt(5, 20);
  let b = randInt(2, 15);
  let answer;
  let question;

  if (op === "+") {
    answer = a + b;
    question = `${a} + ${b} = ?`;
  } else if (op === "-") {
    if (a < b) [a, b] = [b, a];
    answer = a - b;
    question = `${a} - ${b} = ?`;
  } else {
    answer = a * b;
    question = `${a} × ${b} = ?`;
  }

  return {
    id: `dyn-math-${dynamicIdCounter++}`,
    type: "math",
    question,
    answer: String(answer),
  };
}

function makeOddOneOutPuzzle() {
  const sets = [
    { options: ["Apple", "Banana", "Carrot", "Orange"], answer: "Carrot" },
    { options: ["Dog", "Lion", "Eagle", "Cat"], answer: "Eagle" },
    { options: ["Guitar", "Drums", "Piano", "Mic"], answer: "Mic" },
    { options: ["Mercury", "Venus", "Earth", "Sun"], answer: "Sun" },
  ];
  const choice = sets[randInt(0, sets.length - 1)];
  return {
    id: `dyn-odd-${dynamicIdCounter++}`,
    type: "odd_one_out",
    question: "Which is the odd one out?",
    options: shuffle(choice.options),
    answer: choice.answer,
  };
}

function makeImageClickPuzzle() {
  const themes = [
    {
      question: "Tap all the 🐶 dogs",
      options: [
        { label: "🐶", isCorrect: true }, { label: "🐱", isCorrect: false },
        { label: "🐶", isCorrect: true }, { label: "🐦", isCorrect: false },
        { label: "🐶", isCorrect: true }, { label: "🐷", isCorrect: false },
      ],
    },
    {
      question: "Tap all the 🍕 foods",
      options: [
        { label: "🍕", isCorrect: true }, { label: "🍎", isCorrect: false },
        { label: "🍔", isCorrect: true }, { label: "🌵", isCorrect: false },
        { label: "🍟", isCorrect: true }, { label: "🚗", isCorrect: false },
      ],
    },
  ];
  const choice = themes[randInt(0, themes.length - 1)];
  return {
    id: `dyn-img-${dynamicIdCounter++}`,
    type: "image_click",
    question: choice.question,
    images: shuffle(choice.options),
  };
}

function makeGridTapPuzzle() {
  const themes = [
    {
      question: "Select all the even numbers",
      items: [
        { label: "1", isCorrect: false }, { label: "2", isCorrect: true },
        { label: "3", isCorrect: false }, { label: "4", isCorrect: true },
        { label: "5", isCorrect: false }, { label: "6", isCorrect: true },
        { label: "7", isCorrect: false }, { label: "8", isCorrect: true },
        { label: "9", isCorrect: false }, { label: "10", isCorrect: true },
        { label: "11", isCorrect: false }, { label: "12", isCorrect: true },
        { label: "13", isCorrect: false }, { label: "14", isCorrect: true },
        { label: "15", isCorrect: false }, { label: "16", isCorrect: true },
      ],
    },
    {
      question: "Tap all the blue items",
      items: [
        { label: "🔵", isCorrect: true }, { label: "🔴", isCorrect: false },
        { label: "🟢", isCorrect: false }, { label: "⚫", isCorrect: false },
        { label: "🔵", isCorrect: true }, { label: "🟣", isCorrect: false },
        { label: "🔵", isCorrect: true }, { label: "🟡", isCorrect: false },
        { label: "🔵", isCorrect: true }, { label: "🟥", isCorrect: false },
        { label: "🟦", isCorrect: true }, { label: "🟩", isCorrect: false },
        { label: "🔵", isCorrect: true }, { label: "🔶", isCorrect: false },
        { label: "🔵", isCorrect: true }, { label: "⚪", isCorrect: false },
      ],
    },
  ];
  const choice = themes[randInt(0, themes.length - 1)];
  return {
    id: `dyn-grid-${dynamicIdCounter++}`,
    type: "grid_tap",
    question: choice.question,
    items: shuffle(choice.items),
  };
}

function makeFillMissingPuzzle() {
  const sets = [
    {
      sequence: ["⬛", "⬜", "⬛", null],
      options: ["⬛", "⬜", "🟦"],
      answer: "⬜",
    },
    {
      sequence: ["🍎", "🍌", "🍎", null],
      options: ["🍎", "🍌", "🍓"],
      answer: "🍌",
    },
    {
      sequence: ["★", "☆", "★", null],
      options: ["★", "☆", "⭐"],
      answer: "☆",
    },
  ];
  const choice = sets[randInt(0, sets.length - 1)];
  return {
    id: `dyn-fill-${dynamicIdCounter++}`,
    type: "fill_missing",
    question: "Complete the pattern",
    sequence: choice.sequence,
    options: choice.options,
    answer: choice.answer,
  };
}

function makeShadowMatchPuzzle() {
  const sets = [
    {
      shadow: "🍎 (silhouette)",
      options: [
        { label: "🍎" }, { label: "🍌" }, { label: "🍇" }, { label: "🥕" },
      ],
      answer: "🍎",
    },
    {
      shadow: "🚗 (silhouette)",
      options: [
        { label: "🚌" }, { label: "🚗" }, { label: "🚲" }, { label: "✈️" },
      ],
      answer: "🚗",
    },
  ];
  const choice = sets[randInt(0, sets.length - 1)];
  return {
    id: `dyn-shadow-${dynamicIdCounter++}`,
    type: "shadow_match",
    question: "Match the shadow to the object",
    shadow: choice.shadow,
    options: choice.options,
    answer: choice.answer,
  };
}

export function getRandomPuzzle() {
  if (Math.random() < 0.5) {
    const builders = [
      makeMathPuzzle,
      makeOddOneOutPuzzle,
      makeImageClickPuzzle,
      makeGridTapPuzzle,
      makeFillMissingPuzzle,
      makeShadowMatchPuzzle,
    ];
    return builders[randInt(0, builders.length - 1)]();
  }
  return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

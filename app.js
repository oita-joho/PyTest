function byId(id) {
  return document.getElementById(id);
}

const btnGenerate = byId("btnGenerate");
const btnSimilar = byId("btnSimilar");
const btnAnswer = byId("btnAnswer");
const btnCheck = byId("btnCheck");
const modeSelect = byId("modeSelect");

const statusEl = byId("status");
const questionArea = byId("questionArea");
const solutionArea = byId("solutionArea");

const questionTypeEl = byId("questionType");
const questionTextEl = byId("questionText");
const codeBlockEl = byId("codeBlock");
const userAnswerEl = byId("userAnswer");
const judgeResultEl = byId("judgeResult");

const correctAnswerEl = byId("correctAnswer");
const explanationEl = byId("explanation");

let currentQuestion = null;

// ------------------------
// 共通
// ------------------------
function setStatus(text) {
  statusEl.textContent = text || "";
}

function normalizeText(v) {
  return String(v || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/，/g, ",")
    .replace(/＝/g, "=")
    .replace(/　/g, "");
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderQuestion(data) {
  currentQuestion = data;

  questionArea.classList.remove("hidden");
  solutionArea.classList.add("hidden");

  questionTypeEl.textContent = data.type || "問題";
  questionTextEl.textContent = data.question || "";
  codeBlockEl.textContent = data.code || "";

  userAnswerEl.value = "";
  judgeResultEl.textContent = "";
  judgeResultEl.className = "judge";

  btnSimilar.disabled = false;
  btnAnswer.disabled = false;
}

function showAnswer() {
  if (!currentQuestion) return;

  correctAnswerEl.textContent = currentQuestion.answer || "";
  explanationEl.textContent = currentQuestion.explanation || "";
  solutionArea.classList.remove("hidden");
}

function checkAnswer() {
  if (!currentQuestion) return;

  const user = normalizeText(userAnswerEl.value);
  const answer = normalizeText(currentQuestion.answer);

  if (user === answer) {
    judgeResultEl.textContent = "正解です。";
    judgeResultEl.className = "judge ok";
  } else {
    judgeResultEl.textContent = "不正解です。";
    judgeResultEl.className = "judge ng";
  }
}

// ------------------------
// 問題生成
// ------------------------
function makeBlankQuestion() {
  const pattern = randInt(1, 4);

  if (pattern === 1) {
    const start = randInt(1, 3);
    const end = randInt(start + 3, start + 6);

    return {
      category: "blank_range_end",
      type: "空欄補充",
      question: `${start}から${end}までの数字を順に表示するプログラムです。□に入るものを答えなさい。`,
      code:
`for i in range(${start}, □):
    print(i)`,
      answer: String(end + 1),
      explanation: `range(${start}, ${end + 1}) とすると、${start}から${end}まで表示されます。range は最後の数を含みません。`
    };
  }

  if (pattern === 2) {
    const start = randInt(1, 4);
    const end = randInt(start + 2, start + 5);

    return {
      category: "blank_range_start",
      type: "空欄補充",
      question: `${start}から${end}までの数字を順に表示するプログラムです。□に入るものを答えなさい。`,
      code:
`for i in range(□, ${end + 1}):
    print(i)`,
      answer: String(start),
      explanation: `${start}から始めるには、range(${start}, ${end + 1}) にします。`
    };
  }

  if (pattern === 3) {
    const start = randInt(1, 3);
    const end = randInt(start + 2, start + 4);
    let total = 0;
    for (let i = start; i <= end; i++) {
      total += i;
    }

    return {
      category: "blank_total_init",
      type: "空欄補充",
      question: `${start}から${end}までの合計を求めるプログラムです。□に入るものを答えなさい。`,
      code:
`total = □
for i in range(${start}, ${end + 1}):
    total += i
print(total)`,
      answer: "0",
      explanation: `合計を求める前は total を 0 にしておきます。`
    };
  }

  const n = randInt(4, 8);
  return {
    category: "blank_reverse_start",
    type: "空欄補充",
    question: `${n}から1まで逆順に表示するプログラムです。□に入るものを答えなさい。`,
    code:
`for i in range(□, 0, -1):
    print(i)`,
    answer: String(n),
    explanation: `逆順で ${n} から始めるので、最初の値は ${n} です。`
  };
}

function makeSymbolQuestion() {
  const pattern = randInt(1, 4);

  if (pattern === 1) {
    const start = randInt(1, 3);
    const end = randInt(start + 3, start + 6);

    return {
      category: "symbol_comma",
      type: "記号問題",
      question: `${start}から${end}まで表示するプログラムです。□に入る記号を答えなさい。`,
      code:
`for i in range(${start} □ ${end + 1}):
    print(i)`,
      answer: ",",
      explanation: `range の引数はカンマで区切ります。`
    };
  }

  if (pattern === 2) {
    return {
      category: "symbol_equal",
      type: "記号問題",
      question: `偶数だけを表示するプログラムです。□に入る記号を答えなさい。`,
      code:
`for i in range(1, 7):
    if i % 2 □ 0:
        print(i)`,
      answer: "==",
      explanation: `i % 2 == 0 のとき、2で割った余りが0、つまり偶数です。`
    };
  }

  if (pattern === 3) {
    const start = randInt(1, 3);
    const end = randInt(start + 2, start + 5);

    return {
      category: "symbol_plus_equal",
      type: "記号問題",
      question: `${start}から${end}までの合計を求めるプログラムです。□に入る記号を答えなさい。`,
      code:
`total = 0
for i in range(${start}, ${end + 1}):
    total □ i
print(total)`,
      answer: "+=",
      explanation: `total += i は、total = total + i と同じ意味です。`
    };
  }

  return {
    category: "symbol_minus",
    type: "記号問題",
    question: `大きい数から小さい数へ1ずつ減らしていくプログラムです。□に入る記号を答えなさい。`,
    code:
`for i in range(6, 0, □1):
    print(i)`,
    answer: "-",
    explanation: `1ずつ減らすので -1 を使います。`
  };
}

function makeTraceQuestion() {
  const pattern = randInt(1, 4);

  if (pattern === 1) {
    const start = randInt(1, 3);
    const end = randInt(start + 2, start + 5);
    const out = [];

    for (let i = start; i <= end; i++) {
      out.push(i);
    }

    return {
      category: "trace_forward",
      type: "トレース問題",
      question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
      code:
`for i in range(${start}, ${end + 1}):
    print(i)`,
      answer: out.join(","),
      explanation: `${start}から${end}まで1ずつ増えながら表示されます。`
    };
  }

  if (pattern === 2) {
    const start = randInt(5, 8);
    const end = randInt(1, start - 2);
    const out = [];

    for (let i = start; i >= end; i--) {
      out.push(i);
    }

    return {
      category: "trace_reverse",
      type: "トレース問題",
      question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
      code:
`for i in range(${start}, ${end - 1}, -1):
    print(i)`,
      answer: out.join(","),
      explanation: `${start}から${end}まで1ずつ減りながら表示されます。`
    };
  }

  if (pattern === 3) {
    const start = randInt(1, 3);
    const end = randInt(start + 2, start + 4);
    let total = 0;

    for (let i = start; i <= end; i++) {
      total += i;
    }

    return {
      category: "trace_sum",
      type: "トレース問題",
      question: "次のプログラムを実行したとき、最後に表示される数を答えなさい。",
      code:
`total = 0
for i in range(${start}, ${end + 1}):
    total += i
print(total)`,
      answer: String(total),
      explanation: `${start}から${end}までを順に足した結果が表示されます。`
    };
  }

  const start = randInt(1, 3);
  const end = randInt(start + 3, start + 6);
  const out = [];

  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      out.push(i);
    }
  }

  return {
    category: "trace_even",
    type: "トレース問題",
    question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
    code:
`for i in range(${start}, ${end + 1}):
    if i % 2 == 0:
        print(i)`,
    answer: out.join(","),
    explanation: `${start}から${end}までの中で、偶数だけが表示されます。`
  };
}

function generateQuestion(mode) {
  if (mode === "blank") return makeBlankQuestion();
  if (mode === "symbol") return makeSymbolQuestion();
  if (mode === "trace") return makeTraceQuestion();

  return pick([makeBlankQuestion, makeSymbolQuestion, makeTraceQuestion])();
}

function generateSimilarQuestion(base) {
  if (!base) return generateQuestion("mixed");

  if (base.type === "空欄補充") return makeBlankQuestion();
  if (base.type === "記号問題") return makeSymbolQuestion();
  if (base.type === "トレース問題") return makeTraceQuestion();

  return generateQuestion("mixed");
}

// ------------------------
// イベント
// ------------------------
function onGenerate() {
  const mode = modeSelect.value;
  const q = generateQuestion(mode);
  renderQuestion(q);
  setStatus("問題を生成しました。");
}

function onSimilar() {
  if (!currentQuestion) return;
  const q = generateSimilarQuestion(currentQuestion);
  renderQuestion(q);
  setStatus("類題を生成しました。");
}

btnGenerate.addEventListener("click", onGenerate);
btnSimilar.addEventListener("click", onSimilar);
btnAnswer.addEventListener("click", showAnswer);
btnCheck.addEventListener("click", checkAnswer);

const API_BASE = "https://YOUR-RENDER-URL.onrender.com";

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

function setStatus(text) {
  statusEl.textContent = text || "";
}

function normalizeText(v) {
  return String(v || "").trim().replace(/\s+/g, "");
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

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "通信エラー");
  }

  return res.json();
}

async function generateQuestion() {
  setStatus("問題を生成中...");
  btnGenerate.disabled = true;

  try {
    const mode = modeSelect.value;
    const data = await postJson(`${API_BASE}/api/generate`, { mode });
    renderQuestion(data);
    setStatus("問題を生成しました。");
  } catch (err) {
    setStatus(`エラー: ${err.message}`);
  } finally {
    btnGenerate.disabled = false;
  }
}

async function generateSimilar() {
  if (!currentQuestion) return;

  setStatus("類題を生成中...");
  btnSimilar.disabled = true;

  try {
    const data = await postJson(`${API_BASE}/api/similar`, {
      baseQuestion: currentQuestion
    });
    renderQuestion(data);
    setStatus("類題を生成しました。");
  } catch (err) {
    setStatus(`エラー: ${err.message}`);
  } finally {
    btnSimilar.disabled = false;
  }
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

btnGenerate.addEventListener("click", generateQuestion);
btnSimilar.addEventListener("click", generateSimilar);
btnAnswer.addEventListener("click", showAnswer);
btnCheck.addEventListener("click", checkAnswer);

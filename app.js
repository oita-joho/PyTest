function byId(id) {
  return document.getElementById(id);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const problemSelect = byId("problemSelect");
const levelSelect = byId("levelSelect");
const btnLoad = byId("btnLoad");
const btnSimilar = byId("btnSimilar");
const btnAnswer = byId("btnAnswer");
const btnMasterAnswer = byId("btnMasterAnswer");
const btnBasicCheck = byId("btnBasicCheck");
const btnStandardCheck = byId("btnStandardCheck");

const statusEl = byId("status");
const questionArea = byId("questionArea");

const masterTitle = byId("masterTitle");
const masterQuestion = byId("masterQuestion");
const masterCode = byId("masterCode");
const masterAnswerArea = byId("masterAnswerArea");
const masterAnswer = byId("masterAnswer");
const btnPdf = byId("btnPdf");
const masterExplanation = byId("masterExplanation");

const basicQuestion = byId("basicQuestion");
const basicCode = byId("basicCode");
const basicInput = byId("basicInput");
const basicJudge = byId("basicJudge");
const basicAnswerArea = byId("basicAnswerArea");
const basicAnswer = byId("basicAnswer");
const basicExplanation = byId("basicExplanation");

const standardQuestion = byId("standardQuestion");
const standardCode = byId("standardCode");
const standardInput = byId("standardInput");
const standardJudge = byId("standardJudge");
const standardAnswerArea = byId("standardAnswerArea");
const standardAnswer = byId("standardAnswer");
const standardExplanation = byId("standardExplanation");

let currentBase = null;
let currentBasic = null;
let currentStandard = null;

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

function initProblemSelect() {
  problemSelect.innerHTML = "";
  baseProblems.forEach(problem => {
    const opt = document.createElement("option");
    opt.value = problem.id;
    opt.textContent = problem.title;
    problemSelect.appendChild(opt);
  });
}

function getBaseById(id) {
  return baseProblems.find(p => p.id === id) || null;
}

function renderMaster(problem) {
  masterTitle.textContent = problem.title;
  masterQuestion.textContent = problem.master.question;
  masterCode.textContent = problem.master.code;
  masterAnswer.textContent = problem.master.answer;
  masterExplanation.textContent = problem.master.explanation;
  masterAnswerArea.classList.add("hidden");
}

function renderBasic(data) {
  currentBasic = data;
  basicQuestion.textContent = data.question;
  basicCode.textContent = data.code;
  basicInput.value = "";
  basicJudge.textContent = "";
  basicJudge.className = "judge";
  basicAnswer.textContent = data.answer;
  basicExplanation.textContent = data.explanation;
  basicAnswerArea.classList.add("hidden");
}

function renderStandard(data) {
  currentStandard = data;
  standardQuestion.textContent = data.question;
  standardCode.textContent = data.code;
  standardInput.value = "";
  standardJudge.textContent = "";
  standardJudge.className = "judge";
  standardAnswer.textContent = data.answer;
  standardExplanation.textContent = data.explanation;
  standardAnswerArea.classList.add("hidden");
}

function loadProblemSet() {
  const baseId = problemSelect.value;
  currentBase = getBaseById(baseId);

  if (!currentBase) {
    setStatus("ベース問題が見つかりません。");
    return;
  }

  const basicData = currentBase.levels.basic();
  const standardData = currentBase.levels.standard();

  renderMaster(currentBase);
  renderBasic(basicData);
  renderStandard(standardData);

  questionArea.classList.remove("hidden");
  btnSimilar.disabled = false;
  btnAnswer.disabled = false;

  setStatus("問題を表示しました。");
}

function makeSimilar() {
  if (!currentBase) return;

  const level = levelSelect.value;

  if (level === "basic") {
    renderBasic(currentBase.levels.basic());
    setStatus("基礎の類題を作成しました。");
    return;
  }

  if (level === "standard") {
    renderStandard(currentBase.levels.standard());
    setStatus("標準の類題を作成しました。");
    return;
  }
}

function showAllAnswers() {
  masterAnswerArea.classList.remove("hidden");
  basicAnswerArea.classList.remove("hidden");
  standardAnswerArea.classList.remove("hidden");
}

function checkSingle(inputEl, judgeEl, answerValue) {
  const user = normalizeText(inputEl.value);
  const answer = normalizeText(answerValue);

  if (user === answer) {
    judgeEl.textContent = "正解です。";
    judgeEl.className = "judge ok";
  } else {
    judgeEl.textContent = "不正解です。";
    judgeEl.className = "judge ng";
  }
}

btnLoad.addEventListener("click", loadProblemSet);

btnSimilar.addEventListener("click", makeSimilar);

btnAnswer.addEventListener("click", showAllAnswers);

btnMasterAnswer.addEventListener("click", () => {
  masterAnswerArea.classList.remove("hidden");
});

btnBasicCheck.addEventListener("click", () => {
  if (!currentBasic) return;
  checkSingle(basicInput, basicJudge, currentBasic.answer);
});

btnStandardCheck.addEventListener("click", () => {
  if (!currentStandard) return;
  checkSingle(standardInput, standardJudge, currentStandard.answer);
});
btnPdf.addEventListener("click", () => {
  window.print();
});
initProblemSelect();

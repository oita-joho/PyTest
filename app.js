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
const btnPdf = byId("btnPdf");
const btnMasterAnswer = byId("btnMasterAnswer");
const btnBasicCheck = byId("btnBasicCheck");
const btnStandardCheck = byId("btnStandardCheck");

const statusEl = byId("status");
const questionArea = byId("questionArea");

const masterTitle = byId("masterTitle");
const masterQuestion = byId("masterQuestion");
const masterCode = byId("masterCode");
const masterOutput = byId("masterOutput");
const masterExplanation = byId("masterExplanation");
const masterAnswerArea = byId("masterAnswerArea");
const masterAnswer = byId("masterAnswer");

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
const standardOutput = byId("standardOutput");
const standardAnswerArea = byId("standardAnswerArea");
const standardAnswer = byId("standardAnswer");
const standardExplanation = byId("standardExplanation");

const advancedQuestion = byId("advancedQuestion");
const advancedOutput = byId("advancedOutput");

let currentBase = null;
let currentBasic = null;
let currentStandard = null;
let currentAdvanced = null;

function setStatus(text) {
  if (statusEl) {
    statusEl.textContent = text || "";
  }
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
  if (!problemSelect || !window.baseProblems) return;

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
  if (!problem) return;

  if (masterTitle) {
    masterTitle.textContent = problem.title || "";
  }
  if (masterQuestion) {
    masterQuestion.textContent = problem.master?.question || "";
  }
  if (masterCode) {
    masterCode.textContent = problem.master?.code || "";
  }
  if (masterOutput) {
    masterOutput.textContent = problem.master?.answer || "";
  }
  if (masterAnswer) {
    masterAnswer.textContent = problem.master?.answer || "";
  }
  if (masterExplanation) {
    masterExplanation.textContent = problem.master?.explanation || "";
  }
  if (masterAnswerArea) {
    masterAnswerArea.classList.add("hidden");
  }
}

function renderBasic(data) {
  if (!data) return;

  currentBasic = data;

  if (basicQuestion) {
    basicQuestion.textContent = data.question || "";
  }
  if (basicCode) {
    basicCode.textContent = data.code || "";
  }
  if (basicInput) {
    basicInput.value = "";
  }
  if (basicJudge) {
    basicJudge.textContent = "";
    basicJudge.className = "judge";
  }
  if (basicAnswer) {
    basicAnswer.textContent = data.answer || "";
  }
  if (basicExplanation) {
    basicExplanation.textContent = data.explanation || "";
  }
  if (basicAnswerArea) {
    basicAnswerArea.classList.remove("hidden");
  }
}

function renderStandard(data) {
  if (!data) return;

  currentStandard = data;

  if (standardQuestion) {
    standardQuestion.textContent = data.question || "";
  }
  if (standardCode) {
    standardCode.textContent = data.code || "";
  }
  if (standardInput) {
    standardInput.value = "";
  }
  if (standardJudge) {
    standardJudge.textContent = "";
    standardJudge.className = "judge";
  }
  if (standardOutput) {
    standardOutput.textContent = data.answer || "";
  }
  if (standardAnswer) {
    standardAnswer.textContent = data.answer || "";
  }
  if (standardExplanation) {
    standardExplanation.textContent = data.explanation || "";
  }
  if (standardAnswerArea) {
    standardAnswerArea.classList.remove("hidden");
  }
}

function renderAdvanced(data) {
  if (!data) return;

  currentAdvanced = data;

  if (advancedQuestion) {
    advancedQuestion.textContent = data.question || "";
  }
  if (advancedOutput) {
    advancedOutput.textContent = data.output || "";
  }
}

function loadProblemSet() {
  if (!problemSelect) return;

  const baseId = problemSelect.value;
  currentBase = getBaseById(baseId);

  if (!currentBase) {
    setStatus("ベース問題が見つかりません。");
    return;
  }

  const basicData = currentBase.levels?.basic ? currentBase.levels.basic() : null;
  const standardData = currentBase.levels?.standard ? currentBase.levels.standard() : null;
  const advancedData = currentBase.levels?.advanced ? currentBase.levels.advanced() : null;

  renderMaster(currentBase);

  if (basicData) {
    renderBasic(basicData);
  }
  if (standardData) {
    renderStandard(standardData);
  }
  if (advancedData) {
    renderAdvanced(advancedData);
  }

  if (questionArea) {
    questionArea.classList.remove("hidden");
  }

  if (btnSimilar) {
    btnSimilar.disabled = false;
  }
  if (btnAnswer) {
    btnAnswer.disabled = false;
  }
  if (btnPdf) {
    btnPdf.disabled = false;
  }

  setStatus("問題を表示しました。");
}

function makeSimilar() {
  if (!currentBase || !levelSelect) return;

  const level = levelSelect.value;

  if (level === "basic" && currentBase.levels?.basic) {
    renderBasic(currentBase.levels.basic());
    setStatus("基礎の類題を作成しました。");
    return;
  }

  if (level === "standard" && currentBase.levels?.standard) {
    renderStandard(currentBase.levels.standard());
    setStatus("標準の類題を作成しました。");
    return;
  }

  if (level === "advanced" && currentBase.levels?.advanced) {
    renderAdvanced(currentBase.levels.advanced());
    setStatus("応用の類題を作成しました。");
    return;
  }
}

function showMasterAnswer() {
  if (masterAnswerArea) {
    masterAnswerArea.classList.remove("hidden");
  }
}

function checkSingle(inputEl, judgeEl, answerValue) {
  if (!inputEl || !judgeEl) return;

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

function exportPdfView() {
  if (!currentBase) return;

  if (masterAnswerArea) {
    masterAnswerArea.classList.remove("hidden");
  }

  window.print();
}

if (btnLoad) {
  btnLoad.addEventListener("click", loadProblemSet);
}

if (btnSimilar) {
  btnSimilar.addEventListener("click", makeSimilar);
}

if (btnAnswer) {
  btnAnswer.addEventListener("click", showMasterAnswer);
}

if (btnPdf) {
  btnPdf.addEventListener("click", exportPdfView);
}

if (btnMasterAnswer) {
  btnMasterAnswer.addEventListener("click", () => {
    if (masterAnswerArea) {
      masterAnswerArea.classList.remove("hidden");
    }
  });
}

if (btnBasicCheck) {
  btnBasicCheck.addEventListener("click", () => {
    if (!currentBasic) return;
    checkSingle(basicInput, basicJudge, currentBasic.answer);
  });
}

if (btnStandardCheck) {
  btnStandardCheck.addEventListener("click", () => {
    if (!currentStandard) return;
    checkSingle(standardInput, standardJudge, currentStandard.answer);
  });
}

initProblemSelect();

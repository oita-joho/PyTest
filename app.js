function byId(id) {
  return document.getElementById(id);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const problemSelect = byId("problemSelect");
const btnLoad = byId("btnLoad");
const btnPdf = byId("btnPdf");

const masterQuestion = byId("masterQuestion");
const masterCode = byId("masterCode");
const masterOutput = byId("masterOutput");
const masterAnswer = byId("masterAnswer");
const masterExplanation = byId("masterExplanation");

const basicQuestion = byId("basicQuestion");
const basicCode = byId("basicCode");
const basicAnswer = byId("basicAnswer");
const basicExplanation = byId("basicExplanation");

const standardQuestion = byId("standardQuestion");
const standardCode = byId("standardCode");
const standardOutput = byId("standardOutput");
const standardAnswer = byId("standardAnswer");
const standardExplanation = byId("standardExplanation");

const advancedQuestion = byId("advancedQuestion");
const advancedOutput = byId("advancedOutput");

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

function renderProblem(problem) {
  if (!problem) return;

  const basic = problem.levels.basic();
  const standard = problem.levels.standard();
  const advanced = problem.levels.advanced();

  masterQuestion.textContent = problem.master.question || "";
  masterCode.textContent = problem.master.code || "";
  masterOutput.textContent = problem.master.output || "";
  masterAnswer.textContent = problem.master.answer || "";
  masterExplanation.textContent = problem.master.explanation || "";

  basicQuestion.textContent = basic.question || "";
  basicCode.textContent = basic.code || "";
  basicAnswer.textContent = basic.answer || "";
  basicExplanation.textContent = basic.explanation || "";

  standardQuestion.textContent = standard.question || "";
  standardCode.textContent = standard.code || "";
  standardOutput.textContent = standard.output || "";
  standardAnswer.textContent = standard.answer || "";
  standardExplanation.textContent = standard.explanation || "";

  advancedQuestion.textContent = advanced.question || "";
  advancedOutput.textContent = advanced.output || "";
}

function loadSelectedProblem() {
  const selectedId = problemSelect.value;
  const problem = getBaseById(selectedId);
  renderProblem(problem);
}

function exportPdf() {
  window.print();
}

btnLoad.addEventListener("click", loadSelectedProblem);
btnPdf.addEventListener("click", exportPdf);

initProblemSelect();
if (baseProblems.length > 0) {
  problemSelect.value = baseProblems[0].id;
}

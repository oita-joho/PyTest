function byId(id) {
  return document.getElementById(id);
}

const toolsText = byId("toolsText");
const taskText = byId("taskText");
const promptBox = byId("promptBox");
const jsonBox = byId("jsonBox");

const btnExample1 = byId("btnExample1");
const btnExample2 = byId("btnExample2");
const btnMakePrompt = byId("btnMakePrompt");
const btnCopyPrompt = byId("btnCopyPrompt");
const btnLoadJson = byId("btnLoadJson");
const btnPdf = byId("btnPdf");

const statusEl = byId("status");

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

function setStatus(text) {
  statusEl.textContent = text || "";
}

function makePrompt() {
  const tools = toolsText.value.trim();
  const task = taskText.value.trim();

  if (!tools || !task) {
    setStatus("「使うもの」と「したい処理」を入力してください。");
    return;
  }

  const prompt = `
あなたは高校生向けPython問題作成AIです。

使うもの:
${tools}

したい処理:
${task}

次の条件で、日本語の問題を作成してください。
- 完成した問題・基礎・標準・応用の4つを作る
- 完成した問題は、問題文・コード・出力・正解・解説を含める
- 基礎は、穴埋めまたは記号問題にする
- 標準は、出力を答える問題にする
- 応用は、コードを書かせる問題にする
- 応用では出力結果も示す
- 丁寧で分かりやすい文にする
- 必ずJSONのみを返す
- コードはPythonにする

返すJSONはこの形式にしてください:

{
  "master": {
    "question": "",
    "code": "",
    "output": "",
    "answer": "",
    "explanation": ""
  },
  "basic": {
    "question": "",
    "code": "",
    "answer": "",
    "explanation": ""
  },
  "standard": {
    "question": "",
    "code": "",
    "output": "",
    "answer": "",
    "explanation": ""
  },
  "advanced": {
    "question": "",
    "output": ""
  }
}
`.trim();

  promptBox.value = prompt;
  setStatus("AI用プロンプトを作成しました。無料AIに貼り付けて、返ってきたJSONを下に貼ってください。");
}

async function copyPrompt() {
  if (!promptBox.value.trim()) {
    setStatus("先にAI用プロンプトを作成してください。");
    return;
  }

  try {
    await navigator.clipboard.writeText(promptBox.value);
    setStatus("プロンプトをコピーしました。");
  } catch (err) {
    setStatus("コピーに失敗しました。手動でコピーしてください。");
  }
}

function renderFromJson(data) {
  masterQuestion.textContent = data.master?.question || "";
  masterCode.textContent = data.master?.code || "";
  masterOutput.textContent = data.master?.output || "";
  masterAnswer.textContent = data.master?.answer || "";
  masterExplanation.textContent = data.master?.explanation || "";

  basicQuestion.textContent = data.basic?.question || "";
  basicCode.textContent = data.basic?.code || "";
  basicAnswer.textContent = data.basic?.answer || "";
  basicExplanation.textContent = data.basic?.explanation || "";

  standardQuestion.textContent = data.standard?.question || "";
  standardCode.textContent = data.standard?.code || "";
  standardOutput.textContent = data.standard?.output || "";
  standardAnswer.textContent = data.standard?.answer || "";
  standardExplanation.textContent = data.standard?.explanation || "";

  advancedQuestion.textContent = data.advanced?.question || "";
  advancedOutput.textContent = data.advanced?.output || "";
}

function loadJson() {
  let text = jsonBox.value.trim();

  if (!text) {
    setStatus("AIが返したJSONを貼ってください。");
    return;
  }

  // ```json ... ``` を除去
  text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

  try {
    const data = JSON.parse(text);
    renderFromJson(data);
    setStatus("JSONを読み込みました。");
  } catch (err) {
    setStatus("JSONの形式が正しくありません。AIの返答をそのまま貼っているか確認してください。");
  }
}

function exportPdf() {
  window.print();
}

function setExample1() {
  toolsText.value = "for, range, print";
  taskText.value = "ある文字列を4回表示する";
  setStatus("例1を入力しました。");
}

function setExample2() {
  toolsText.value = "for, range, print";
  taskText.value = "3から7まで順番に表示する";
  setStatus("例2を入力しました。");
}

btnExample1.addEventListener("click", setExample1);
btnExample2.addEventListener("click", setExample2);
btnMakePrompt.addEventListener("click", makePrompt);
btnCopyPrompt.addEventListener("click", copyPrompt);
btnLoadJson.addEventListener("click", loadJson);
btnPdf.addEventListener("click", exportPdf);

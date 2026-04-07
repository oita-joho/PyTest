const GAS_URL = "https://script.google.com/macros/s/AKfycbyHwm7D2bDFumEM69ozn-bsEGwEZIVlGL6DN9a4KDPCE3JyvL9iC_Cgi4zrj60oeQnHfg/exec";

const toolsSelect = document.getElementById("toolsSelect");
const taskSelect = document.getElementById("taskSelect");
const noteBox = document.getElementById("noteBox");
const promptText = document.getElementById("promptText");
const jsonInput = document.getElementById("jsonInput");
const output = document.getElementById("output");
const pdfArea = document.getElementById("pdfArea");
const statusEl = document.getElementById("status");

const btnMakePrompt = document.getElementById("btnMakePrompt");
const btnCopyPrompt = document.getElementById("btnCopyPrompt");
const btnRenderJson = document.getElementById("btnRenderJson");
const btnResetJson = document.getElementById("btnResetJson");
const btnSaveJson = document.getElementById("btnSaveJson");
const btnPdf = document.getElementById("btnPdf");
const btnGemini = document.getElementById("btnGemini");

let currentTasks = [];

function setStatus(message) {
  statusEl.textContent = message;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function nl2br(str) {
  return escapeHtml(str).replace(/\n/g, "<br>");
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("通信に失敗しました。");
  }
  return await response.json();
}

async function loadTools() {
  setStatus("使うものを読み込んでいます...");
  try {
    const data = await fetchJson(`${GAS_URL}?action=listTools`);
    toolsSelect.innerHTML = `<option value="">選んでください</option>`;

    for (const tool of data.tools) {
      const option = document.createElement("option");
      option.value = tool;
      option.textContent = tool;
      toolsSelect.appendChild(option);
    }

    setStatus("使うものを読み込みました。");
  } catch (error) {
    setStatus("読み込みエラー: " + error.message);
  }
}

async function loadTasksByTools(tools) {
  taskSelect.innerHTML = `<option value="">読み込み中...</option>`;
  noteBox.textContent = "処理を選ぶとメモが表示されます。";
  currentTasks = [];

  try {
    const data = await fetchJson(`${GAS_URL}?action=listTasksByTools&tools=${encodeURIComponent(tools)}`);
    currentTasks = data.tasks || [];

    taskSelect.innerHTML = `<option value="">選んでください</option>`;

    for (const item of currentTasks) {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.task;
      taskSelect.appendChild(option);
    }

    setStatus("処理を読み込みました。");
  } catch (error) {
    taskSelect.innerHTML = `<option value="">読み込みに失敗しました</option>`;
    setStatus("読み込みエラー: " + error.message);
  }
}

function getSelectedTaskItem() {
  const selectedId = taskSelect.value;
  return currentTasks.find(item => String(item.id) === String(selectedId)) || null;
}

function makePrompt(tools, task) {
  return `あなたは高校生向けPython問題作成AIです。

次の条件に従って、日本語の問題を作成してください。

【学習内容】
使うもの: ${tools}
したい処理: ${task}

【全体条件】
- 完成した問題・基礎・標準・応用の4つを作る
- コードはPythonにする
- 高校生が読んで分かる丁寧な文にする
- 必ずJSONのみを返す
- JSONの前後に説明文を書かない
- コード中のダブルクォーテーションは必ず半角を使う
- JSONとして正しく解釈できる文字だけを使う
- 穴埋めはコメントで表現する
- 標準にはoutputを入れない
- advancedにはcodeを入れず、questionとoutputのみ入れる
- 値はすべて文字列にする

【完成した問題】
- 学習内容の中心になる例題にする
- 問題文・コード・出力・正解・解説を含める
- 最も基本となる自然な例にする

【基礎】
- 完成した問題と同じではなく、少しやさしい形にする
- 穴埋め問題または記号問題にする
- 何をするプログラムかを問題文に明記する
- 文法の基本理解を確認する問題にする

【標準】
- 完成した問題と同じではなく、数字・文字列・条件などを少し変える
- 出力を答える問題にする
- 基礎より少し考える必要がある問題にする
- 完成した問題の理解を応用できる内容にする
- output欄は作らない

【応用】
- 完成した問題と同じではなく、設定を少し変える
- コードを書かせる問題にする
- 出力結果も示す
- 学習者が自分でコードを書けるように、条件を丁寧に書く
- 完成した問題の考え方を使って、自分でプログラムを書けるかを確認する問題にする

【出力形式】
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
    "answer": "",
    "explanation": ""
  },
  "advanced": {
    "question": "",
    "output": ""
  }
}`;
}

function validateJsonData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("JSONの形式が正しくありません。");
  }

  const required = {
    master: ["question", "code", "output", "answer", "explanation"],
    basic: ["question", "code", "answer", "explanation"],
    standard: ["question", "code", "answer", "explanation"],
    advanced: ["question", "output"]
  };

  for (const section in required) {
    if (!(section in data)) {
      throw new Error(`${section} がありません。`);
    }
    for (const key of required[section]) {
      if (!(key in data[section])) {
        throw new Error(`${section}.${key} がありません。`);
      }
      if (typeof data[section][key] !== "string") {
        throw new Error(`${section}.${key} は文字列にしてください。`);
      }
    }
  }
}

function createResultCard(title, obj) {
  let html = `<div class="result-card">`;
  html += `<h3>${escapeHtml(title)}</h3>`;

  if (obj.question) {
    html += `<div class="result-label">問題</div>`;
    html += `<div class="text-block">${nl2br(obj.question)}</div>`;
  }

  if (obj.code) {
    html += `<div class="result-label">コード</div>`;
    html += `<div class="code-block">${escapeHtml(obj.code)}</div>`;
  }

  if (obj.output) {
    html += `<div class="result-label">出力</div>`;
    html += `<div class="text-block">${nl2br(obj.output)}</div>`;
  }

  if (obj.answer) {
    html += `<div class="result-label">正解</div>`;
    html += `<div class="answer-block">${nl2br(obj.answer)}</div>`;
  }

  if (obj.explanation) {
    html += `<div class="result-label">解説</div>`;
    html += `<div class="text-block">${nl2br(obj.explanation)}</div>`;
  }

  html += `</div>`;
  return html;
}

function buildPdfHtml(data) {
  const taskItem = getSelectedTaskItem();
  const task = taskItem ? taskItem.task : "";
  const note = taskItem && taskItem.note ? taskItem.note : "この処理の理解を確認する問題";

  return `
    <div class="pdf-sheet">
      <div class="pdf-main-title">プログラム確認問題</div>

      <div class="pdf-intent">
        <strong>タイトル</strong>　${escapeHtml(task || "未設定")}<br>
        <strong>どんな意図の問題</strong>　${escapeHtml(note)}
      </div>

      <div class="pdf-meta-row">
        <div class="pdf-meta-cell">番号</div>
        <div class="pdf-meta-cell">氏名</div>
        <div class="pdf-meta-cell">得点</div>
      </div>

      <div class="pdf-section">
        <div class="pdf-section-title">完成した問題</div>
        <div class="pdf-question">
          <div class="pdf-label">問題</div>
          <div>${nl2br(data.master.question)}</div>
        </div>
        <div class="pdf-code">
          <div class="pdf-label">コード</div>
          <div class="pdf-code-box">${escapeHtml(data.master.code)}</div>
        </div>
        <div class="pdf-output">
          <div class="pdf-label">出力</div>
          <div class="pdf-output-box">${nl2br(data.master.output)}</div>
        </div>
      </div>

      <div class="pdf-section">
        <div class="pdf-section-title">基礎</div>
        <div class="pdf-question">
          <div class="pdf-label">問題</div>
          <div>${nl2br(data.basic.question)}</div>
        </div>
        <div class="pdf-code">
          <div class="pdf-label">コード</div>
          <div class="pdf-code-box">${escapeHtml(data.basic.code)}</div>
        </div>
        <div class="pdf-answer-space">
          <div class="pdf-label">解答欄</div>
          <div class="pdf-answer-lines"></div>
        </div>
      </div>

      <div class="pdf-section">
        <div class="pdf-section-title">標準</div>
        <div class="pdf-question">
          <div class="pdf-label">問題</div>
          <div>${nl2br(data.standard.question)}</div>
        </div>
        <div class="pdf-code">
          <div class="pdf-label">コード</div>
          <div class="pdf-code-box">${escapeHtml(data.standard.code)}</div>
        </div>
        <div class="pdf-answer-space">
          <div class="pdf-label">解答欄</div>
          <div class="pdf-answer-lines"></div>
        </div>
      </div>

      <div class="pdf-section">
        <div class="pdf-section-title">応用</div>
        <div class="pdf-question">
          <div class="pdf-label">問題</div>
          <div>${nl2br(data.advanced.question)}</div>
        </div>
        <div class="pdf-output">
          <div class="pdf-label">出力結果</div>
          <div class="pdf-output-box">${nl2br(data.advanced.output)}</div>
        </div>
        <div class="pdf-code-space">
          <div class="pdf-label">コードを書く欄</div>
          <div class="pdf-code-lines"></div>
        </div>
      </div>
    </div>
  `;
}

function renderJson() {
  const text = jsonInput.value.trim();

  if (!text) {
    output.innerHTML = `<div class="empty-text">JSONが入力されていません。</div>`;
    pdfArea.innerHTML = "";
    setStatus("JSONを貼り付けてください。");
    return;
  }

  try {
    const data = JSON.parse(text);
    validateJsonData(data);

    let html = "";
    html += createResultCard("完成した問題", data.master);
    html += createResultCard("基礎", data.basic);
    html += createResultCard("標準", data.standard);
    html += createResultCard("応用", data.advanced);

    output.innerHTML = html;
    pdfArea.innerHTML = buildPdfHtml(data);
    setStatus("JSONを表示しました。");
  } catch (error) {
    output.innerHTML = `<div class="empty-text">表示できませんでした。</div>`;
    pdfArea.innerHTML = "";
    setStatus("JSONエラー: " + error.message);
  }
}

function exportPdf() {
  if (!pdfArea.innerHTML.trim()) {
    setStatus("先にJSONを表示してください。");
    return;
  }
  window.print();
}

async function saveJsonToSheet() {
  const text = jsonInput.value.trim();
  const tools = toolsSelect.value;
  const taskItem = getSelectedTaskItem();

  if (!tools) {
    setStatus("先に使うものを選んでください。");
    return;
  }

  if (!taskItem) {
    setStatus("先に処理を選んでください。");
    return;
  }

  if (!text) {
    setStatus("保存するJSONがありません。");
    return;
  }

  try {
    JSON.parse(text);
  } catch (error) {
    setStatus("JSONの形式が正しくありません。");
    return;
  }

  try {
    setStatus("JSONを保存しています...");

    const payload = {
      action: "saveQuestionJson",
      exampleId: taskItem.id,
      tools: tools,
      task: taskItem.task,
      json: text
    };

    const data = await fetchJson(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (data.ok) {
      setStatus("スプレッドシートに保存しました。");
    } else {
      setStatus("保存に失敗しました。");
    }
  } catch (error) {
    setStatus("保存エラー: " + error.message);
  }
}

async function generateJsonWithGemini() {
  const prompt = promptText.value.trim();

  if (!prompt) {
    setStatus("先にプロンプトを作成してください。");
    return;
  }

  try {
    setStatus("GeminiでJSONを生成しています...");

    const data = await fetchJson(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "generateWithGemini",
        prompt: prompt
      })
    });

    if (!data.ok) {
  setStatus("Geminiエラー: " + (data.message || "不明なエラー"));
  return;
}

if (!data.text) {
  setStatus("Geminiの結果が空です");
  return;
}

    jsonInput.value = data.text;
    renderJson();
    setStatus("GeminiでJSONを生成し、⑤に入力しました。");
  } catch (error) {
    setStatus("Gemini生成エラー: " + error.message);
  }
}

toolsSelect.addEventListener("change", async () => {
  const tools = toolsSelect.value;
  promptText.value = "";
  jsonInput.value = "";
  output.innerHTML = "";
  pdfArea.innerHTML = "";
  noteBox.textContent = "処理を選ぶとメモが表示されます。";

  if (!tools) {
    taskSelect.innerHTML = `<option value="">先に使うものを選んでください</option>`;
    return;
  }

  await loadTasksByTools(tools);
});

taskSelect.addEventListener("change", () => {
  const item = getSelectedTaskItem();
  promptText.value = "";

  if (!item) {
    noteBox.textContent = "処理を選ぶとメモが表示されます。";
    return;
  }

  noteBox.textContent = item.note || "メモはありません。";
});

btnMakePrompt.addEventListener("click", () => {
  const tools = toolsSelect.value;
  const item = getSelectedTaskItem();

  if (!tools) {
    setStatus("使うものを選んでください。");
    return;
  }

  if (!item) {
    setStatus("処理を選んでください。");
    return;
  }

  promptText.value = makePrompt(tools, item.task);
  setStatus("プロンプトを作成しました。");
});

btnCopyPrompt.addEventListener("click", async () => {
  const text = promptText.value.trim();

  if (!text) {
    setStatus("先にプロンプトを作成してください。");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setStatus("プロンプトをコピーしました。");
  } catch (error) {
    setStatus("コピーできませんでした。");
  }
});

btnRenderJson.addEventListener("click", renderJson);

btnResetJson.addEventListener("click", () => {
  if (!confirm("JSON入力欄と表示結果をリセットしますか？")) {
    return;
  }
  jsonInput.value = "";
  output.innerHTML = "";
  pdfArea.innerHTML = "";
  setStatus("JSON入力欄をリセットしました。");
});

btnSaveJson.addEventListener("click", saveJsonToSheet);
btnPdf.addEventListener("click", exportPdf);
btnGemini.addEventListener("click", generateJsonWithGemini);

loadTools();

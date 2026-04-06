const toolsText = byId("toolsText");
const taskText = byId("taskText");
const btnAiGenerate = byId("btnAiGenerate");

async function generateByAI() {
  const res = await fetch("https://あなたのrenderURL/api/generate-problem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      toolsText: toolsText.value,
      taskText: taskText.value
    })
  });

  const data = await res.json();

  // そのまま既存UIに流し込む
  masterQuestion.textContent = data.master.question;
  masterCode.textContent = data.master.code;
  masterOutput.textContent = data.master.output;
  masterAnswer.textContent = data.master.answer;
  masterExplanation.textContent = data.master.explanation;

  basicQuestion.textContent = data.basic.question;
  basicCode.textContent = data.basic.code;
  basicAnswer.textContent = data.basic.answer;
  basicExplanation.textContent = data.basic.explanation;

  standardQuestion.textContent = data.standard.question;
  standardCode.textContent = data.standard.code;
  standardOutput.textContent = data.standard.output;
  standardAnswer.textContent = data.standard.answer;
  standardExplanation.textContent = data.standard.explanation;

  advancedQuestion.textContent = data.advanced.question;
  advancedOutput.textContent = data.advanced.output;
}

btnAiGenerate.addEventListener("click", generateByAI);

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function extractJson(text) {
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("JSON形式の応答を取得できませんでした。");
  }
  return JSON.parse(text.slice(first, last + 1));
}

function makePrompt(mode) {
  const typeInstruction = {
    blank: "Pythonの空欄補充問題を1問作成してください。",
    symbol: "Pythonの記号問題を1問作成してください。",
    trace: "Pythonのトレース問題を1問作成してください。",
    mixed: "Pythonの空欄補充、記号問題、トレース問題のいずれかを1問作成してください。"
  };

  return `
あなたは高校生向けPython問題作成アシスタントです。
${typeInstruction[mode] || typeInstruction.mixed}

条件:
- 日本語で作る
- 難しすぎない
- コードは短め
- 必ず解答と簡潔な解説をつける
- 出力はJSONのみ
- markdownのコードフェンスは使わない

JSON形式:
{
  "type": "空欄補充 または 記号問題 または トレース問題",
  "question": "問題文",
  "code": "Pythonコード",
  "answer": "正解",
  "explanation": "短い解説"
}
`.trim();
}

function makeSimilarPrompt(baseQuestion) {
  return `
あなたは高校生向けPython問題作成アシスタントです。
次の問題の類題を1問作成してください。

元問題:
${JSON.stringify(baseQuestion, null, 2)}

条件:
- 問題タイプはできるだけ似せる
- 数字や条件を変える
- 元問題の丸写しにしない
- 日本語で作る
- 必ず解答と簡潔な解説をつける
- 出力はJSONのみ
- markdownのコードフェンスは使わない

JSON形式:
{
  "type": "空欄補充 または 記号問題 または トレース問題",
  "question": "問題文",
  "code": "Pythonコード",
  "answer": "正解",
  "explanation": "短い解説"
}
`.trim();
}

app.get("/", (req, res) => {
  res.send("Python AI Question Server is running.");
});

app.post("/api/generate", async (req, res) => {
  try {
    const mode = req.body?.mode || "mixed";
    const prompt = makePrompt(mode);

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt
    });

    const text = response.output_text;
    const data = extractJson(text);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("問題生成に失敗しました。");
  }
});

app.post("/api/similar", async (req, res) => {
  try {
    const baseQuestion = req.body?.baseQuestion;
    if (!baseQuestion) {
      return res.status(400).send("baseQuestion がありません。");
    }

    const prompt = makeSimilarPrompt(baseQuestion);

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt
    });

    const text = response.output_text;
    const data = extractJson(text);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("類題生成に失敗しました。");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

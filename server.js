import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.DEEPSEEK_API_KEY;

app.post("/api/generate-problem", async (req, res) => {
  try {
    const { toolsText, taskText } = req.body;

    const prompt = `
あなたは高校生向けPython問題作成AIです。

使うもの:
${toolsText}

したい処理:
${taskText}

次の条件で問題を作成してください。

・日本語で書く
・完成した問題、基礎、標準、応用を作る
・基礎は穴埋め
・標準は出力問題
・応用はコード記述
・出力はJSONのみ

{
 "title": "...",
 "master": { "question": "...", "code": "...", "output": "...", "answer": "...", "explanation": "..." },
 "basic": { "question": "...", "code": "...", "answer": "...", "explanation": "..." },
 "standard": { "question": "...", "code": "...", "output": "...", "answer": "...", "explanation": "..." },
 "advanced": { "question": "...", "output": "..." }
}
`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    // JSON抽出
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const json = JSON.parse(text.slice(start, end + 1));

    res.json(json);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI生成失敗" });
  }
});

app.listen(3000, () => console.log("Server running"));

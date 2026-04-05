const baseProblems = [
  {
    id: "if_pass_7",
    title: "7以上なら合格",
    master: {
      question: "7以上なら「合格」、そうでなければ「不合格」と表示する完成したプログラムです。",
      code: `score = 7

if score >= 7:
    print("合格")
else:
    print("不合格")`,
      answer: "合格",
      explanation: "score が 7 で、7以上の条件を満たしているので「合格」と表示されます。"
    },
    levels: {
      basic: () => {
        const score = randInt(6, 9);
        return {
          question: "□に入る記号を答えなさい。",
          code: `score = ${score}

if score □ 7:
    print("合格")
else:
    print("不合格")`,
          answer: ">=",
          explanation: "7以上は >= で表します。"
        };
      },
      standard: () => {
        const score = randInt(4, 10);
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `score = ${score}

if score >= 7:
    print("合格")
else:
    print("不合格")`,
          answer: score >= 7 ? "合格" : "不合格",
          explanation: `${score} が 7以上かどうかを判定します。`
        };
      },
      advanced: () => {
        const score = randInt(4, 10);
        const result = score >= 7 ? "合格" : "不合格";
        return {
          question: `score = ${score} のとき、出力が「${result}」になるプログラムを書きなさい。`,
          output: result
        };
      }
    }
  },

  {
    id: "if_even",
    title: "偶数なら表示",
    master: {
      question: "数が偶数なら「偶数です」、奇数なら「奇数です」と表示する完成したプログラムです。",
      code: `num = 8

if num % 2 == 0:
    print("偶数です")
else:
    print("奇数です")`,
      answer: "偶数です",
      explanation: "8 は 2 で割った余りが 0 なので偶数です。"
    },
    levels: {
      basic: () => {
        const num = randInt(2, 9);
        return {
          question: "□に入る記号を答えなさい。",
          code: `num = ${num}

if num % 2 □ 0:
    print("偶数です")
else:
    print("奇数です")`,
          answer: "==",
          explanation: "偶数は 2 で割った余りが 0 なので == を使います。"
        };
      },
      standard: () => {
        const num = randInt(1, 12);
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `num = ${num}

if num % 2 == 0:
    print("偶数です")
else:
    print("奇数です")`,
          answer: num % 2 === 0 ? "偶数です" : "奇数です",
          explanation: `${num} を 2 で割った余りで判定します。`
        };
      },
      advanced: () => {
        const num = randInt(1, 12);
        const result = num % 2 === 0 ? "偶数です" : "奇数です";
        return {
          question: `num = ${num} のとき、出力が「${result}」になるプログラムを書きなさい。`,
          output: result
        };
      }
    }
  },

  {
    id: "range_1_to_5",
    title: "1から5まで表示",
    master: {
      question: "1から5まで順に表示する完成したプログラムです。",
      code: `for i in range(1, 6):
    print(i)`,
      answer: "1,2,3,4,5",
      explanation: "range(1, 6) は 1 以上 6 未満なので、1から5まで表示されます。"
    },
    levels: {
      basic: () => {
        const end = randInt(5, 8);
        return {
          question: "□に入る数を答えなさい。",
          code: `for i in range(1, □):
    print(i)`,
          answer: String(end),
          explanation: `range(1, ${end}) なら 1 から ${end - 1} まで表示されます。`
        };
      },
      standard: () => {
        const end = randInt(4, 8);
        const out = [];
        for (let i = 1; i < end; i++) out.push(i);
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `for i in range(1, ${end}):
    print(i)`,
          answer: out.join(","),
          explanation: `1 から ${end - 1} まで順に表示されます。`
        };
      },
      advanced: () => {
        const end = randInt(4, 8);
        const out = [];
        for (let i = 1; i < end; i++) out.push(i);
        return {
          question: `1から${end - 1}まで順に表示し、出力が「${out.join(",")}」になるプログラムを書きなさい。`,
          output: out.join(",")
        };
      }
    }
  }
];

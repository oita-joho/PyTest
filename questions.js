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
    id: "if_multiple_of_3",
    title: "3の倍数なら表示",
    master: {
      question: "3の倍数なら「3の倍数です」、そうでなければ「3の倍数ではありません」と表示する完成したプログラムです。",
      code: `num = 9

if num % 3 == 0:
    print("3の倍数です")
else:
    print("3の倍数ではありません")`,
      answer: "3の倍数です",
      explanation: "9 は 3 で割った余りが 0 なので、3の倍数です。"
    },
    levels: {
      basic: () => {
        const num = randInt(4, 12);
        return {
          question: "□に入る数を答えなさい。",
          code: `num = ${num}

if num % □ == 0:
    print("3の倍数です")
else:
    print("3の倍数ではありません")`,
          answer: "3",
          explanation: "3の倍数かどうかは 3 で割った余りで調べます。"
        };
      },
      standard: () => {
        const num = randInt(1, 15);
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `num = ${num}

if num % 3 == 0:
    print("3の倍数です")
else:
    print("3の倍数ではありません")`,
          answer: num % 3 === 0 ? "3の倍数です" : "3の倍数ではありません",
          explanation: `${num} を 3 で割った余りで判断します。`
        };
      },
      advanced: () => {
        const num = randInt(1, 15);
        const result = num % 3 === 0 ? "3の倍数です" : "3の倍数ではありません";
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
        for (let i = 1; i < end; i++) {
          out.push(i);
        }
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
        for (let i = 1; i < end; i++) {
          out.push(i);
        }
        return {
          question: `1から${end - 1}まで順に表示し、出力が「${out.join(",")}」になるプログラムを書きなさい。`,
          output: out.join(",")
        };
      }
    }
  },

  {
    id: "sum_1_to_5",
    title: "1から5までの合計",
    master: {
      question: "1から5までの合計を求める完成したプログラムです。",
      code: `total = 0

for i in range(1, 6):
    total += i

print(total)`,
      answer: "15",
      explanation: "1 + 2 + 3 + 4 + 5 = 15 です。"
    },
    levels: {
      basic: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 2, start + 4);
        return {
          question: "□に入る数を答えなさい。",
          code: `total = □

for i in range(${start}, ${end + 1}):
    total += i

print(total)`,
          answer: "0",
          explanation: "合計を求める前は 0 から始めます。"
        };
      },
      standard: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 2, start + 4);
        let total = 0;
        for (let i = start; i <= end; i++) {
          total += i;
        }
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `total = 0

for i in range(${start}, ${end + 1}):
    total += i

print(total)`,
          answer: String(total),
          explanation: `${start} から ${end} までを順に足します。`
        };
      },
      advanced: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 2, start + 4);
        let total = 0;
        for (let i = start; i <= end; i++) {
          total += i;
        }
        return {
          question: `${start}から${end}までの合計を求め、出力が「${total}」になるプログラムを書きなさい。`,
          output: String(total)
        };
      }
    }
  },

  {
    id: "reverse_5_to_1",
    title: "5から1まで逆順表示",
    master: {
      question: "5から1まで逆順に表示する完成したプログラムです。",
      code: `for i in range(5, 0, -1):
    print(i)`,
      answer: "5,4,3,2,1",
      explanation: "5から始めて、1ずつ減らしながら1まで表示します。"
    },
    levels: {
      basic: () => {
        const start = randInt(5, 8);
        return {
          question: "□に入る記号を答えなさい。",
          code: `for i in range(${start}, 0, □1):
    print(i)`,
          answer: "-",
          explanation: "逆順なので 1 ずつ減らす -1 を使います。"
        };
      },
      standard: () => {
        const start = randInt(5, 8);
        const out = [];
        for (let i = start; i >= 1; i--) {
          out.push(i);
        }
        return {
          question: "次のプログラムの出力を答えなさい。",
          code: `for i in range(${start}, 0, -1):
    print(i)`,
          answer: out.join(","),
          explanation: `${start} から 1 まで逆順に表示されます。`
        };
      },
      advanced: () => {
        const start = randInt(5, 8);
        const out = [];
        for (let i = start; i >= 1; i--) {
          out.push(i);
        }
        return {
          question: `${start}から1まで逆順に表示し、出力が「${out.join(",")}」になるプログラムを書きなさい。`,
          output: out.join(",")
        };
      }
    }
  }
];

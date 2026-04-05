const baseProblems = [
  {
    id: "range_basic",
    title: "rangeの基本",
    master: {
      question: "1から6までの数字を順に表示する完成したプログラムです。",
      code: `for i in range(1, 7):
    print(i)`,
      answer: "1,2,3,4,5,6",
      explanation: "range(1, 7) は 1 以上 7 未満なので、1から6まで表示されます。"
    },
    levels: {
      basic: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 3, start + 6);
        return {
          baseId: "range_basic",
          levelKey: "basic",
          levelLabel: "基礎",
          question: `${start}から${end}までの数字を順に表示するプログラムです。□に入るものを答えなさい。`,
          code: `for i in range(${start}, □):
    print(i)`,
          answer: String(end + 1),
          explanation: `range(${start}, ${end + 1}) とすると、${start}から${end}まで表示されます。`
        };
      },
      standard: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 4, start + 7);
        const out = [];
        for (let i = start; i <= end; i++) {
          out.push(i);
        }
        return {
          baseId: "range_basic",
          levelKey: "standard",
          levelLabel: "標準",
          question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
          code: `for i in range(${start}, ${end + 1}):
    print(i)`,
          answer: out.join(","),
          explanation: `${start}から${end}までが1ずつ表示されます。`
        };
      }
    }
  },

  {
    id: "even_numbers",
    title: "偶数の表示",
    master: {
      question: "1から8までの中で、偶数だけを表示する完成したプログラムです。",
      code: `for i in range(1, 9):
    if i % 2 == 0:
        print(i)`,
      answer: "2,4,6,8",
      explanation: "i % 2 == 0 のとき、2で割った余りが0なので偶数です。"
    },
    levels: {
      basic: () => {
        const max = randInt(6, 12);
        return {
          baseId: "even_numbers",
          levelKey: "basic",
          levelLabel: "基礎",
          question: `1から${max}までの中で、偶数だけを表示するプログラムです。□に入る記号を答えなさい。`,
          code: `for i in range(1, ${max + 1}):
    if i % 2 □ 0:
        print(i)`,
          answer: "==",
          explanation: "偶数は 2 で割った余りが 0 なので、== を使います。"
        };
      },
      standard: () => {
        const start = randInt(1, 4);
        const end = randInt(start + 5, start + 8);
        const out = [];
        for (let i = start; i <= end; i++) {
          if (i % 2 === 0) out.push(i);
        }
        return {
          baseId: "even_numbers",
          levelKey: "standard",
          levelLabel: "標準",
          question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
          code: `for i in range(${start}, ${end + 1}):
    if i % 2 == 0:
        print(i)`,
          answer: out.join(","),
          explanation: `${start}から${end}までの中で、偶数だけが表示されます。`
        };
      }
    }
  },

  {
    id: "sum_numbers",
    title: "合計を求める",
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
        const end = randInt(start + 2, start + 5);
        return {
          baseId: "sum_numbers",
          levelKey: "basic",
          levelLabel: "基礎",
          question: `${start}から${end}までの合計を求めるプログラムです。□に入るものを答えなさい。`,
          code: `total = □

for i in range(${start}, ${end + 1}):
    total += i

print(total)`,
          answer: "0",
          explanation: "合計を始める前は total を 0 にしておきます。"
        };
      },
      standard: () => {
        const start = randInt(1, 3);
        const end = randInt(start + 3, start + 6);
        let total = 0;
        for (let i = start; i <= end; i++) {
          total += i;
        }
        return {
          baseId: "sum_numbers",
          levelKey: "standard",
          levelLabel: "標準",
          question: "次のプログラムを実行したとき、最後に表示される数を答えなさい。",
          code: `total = 0

for i in range(${start}, ${end + 1}):
    total += i

print(total)`,
          answer: String(total),
          explanation: `${start}から${end}までを順に足した結果です。`
        };
      }
    }
  },

  {
    id: "reverse_order",
    title: "逆順に表示",
    master: {
      question: "6から1まで逆順に表示する完成したプログラムです。",
      code: `for i in range(6, 0, -1):
    print(i)`,
      answer: "6,5,4,3,2,1",
      explanation: "range(6, 0, -1) は 6 から始まり、1ずつ減りながら 1 まで表示します。"
    },
    levels: {
      basic: () => {
        const start = randInt(5, 9);
        return {
          baseId: "reverse_order",
          levelKey: "basic",
          levelLabel: "基礎",
          question: `${start}から1まで逆順に表示するプログラムです。□に入る記号を答えなさい。`,
          code: `for i in range(${start}, 0, □1):
    print(i)`,
          answer: "-",
          explanation: "逆順なので 1 ずつ減らす -1 を使います。"
        };
      },
      standard: () => {
        const start = randInt(6, 10);
        const end = randInt(1, 3);
        const out = [];
        for (let i = start; i >= end; i--) {
          out.push(i);
        }
        return {
          baseId: "reverse_order",
          levelKey: "standard",
          levelLabel: "標準",
          question: "次のプログラムの出力結果を、カンマ区切りで答えなさい。",
          code: `for i in range(${start}, ${end - 1}, -1):
    print(i)`,
          answer: out.join(","),
          explanation: `${start}から${end}まで1ずつ減りながら表示されます。`
        };
      }
    }
  },

  {
    id: "average_even",
    title: "偶数の平均",
    master: {
      question: "1から10までの偶数の合計と個数を使って平均を求める完成したプログラムです。",
      code: `total = 0
count = 0

for i in range(1, 11):
    if i % 2 == 0:
        total += i
        count += 1

if count > 0:
    average = total / count
    print(average)
else:
    print(0)`,
      answer: "6",
      explanation: "偶数は 2,4,6,8,10 なので、合計は30、個数は5、平均は6です。"
    },
    levels: {
      basic: () => {
        const max = 10;
        return {
          baseId: "average_even",
          levelKey: "basic",
          levelLabel: "基礎",
          question: "偶数の個数を数えるプログラムです。□に入る記号を答えなさい。",
          code: `count = 0

for i in range(1, ${max + 1}):
    if i % 2 == 0:
        count □ 1

print(count)`,
          answer: "+=",
          explanation: "1増やすので count += 1 を使います。"
        };
      },
      standard: () => {
        const max = randInt(8, 14);
        let total = 0;
        let count = 0;
        for (let i = 1; i <= max; i++) {
          if (i % 2 === 0) {
            total += i;
            count += 1;
          }
        }
        const average = count > 0 ? total / count : 0;
        return {
          baseId: "average_even",
          levelKey: "standard",
          levelLabel: "標準",
          question: "次のプログラムを実行したとき、最後に表示される数を答えなさい。",
          code: `total = 0
count = 0

for i in range(1, ${max + 1}):
    if i % 2 == 0:
        total += i
        count += 1

if count > 0:
    average = total / count
    print(average)
else:
    print(0)`,
          answer: String(average),
          explanation: `1から${max}までの偶数だけを合計し、個数で割っています。`
        };
      }
    }
  }
];

import { all, BigNumber, create, MathJsStatic } from "mathjs";

export class BigMath {
  private readonly math;

  constructor() {
    const math = create(all, {
      number: "BigNumber",
      precision: 32,
    }) as MathJsStatic;

    const replacements: Record<string, unknown> = {};

    const fns1: (keyof typeof math)[] = [
      "sin",
      "cos",
      "tan",
      "sec",
      "cot",
      "csc",
    ];
    fns1.forEach((name) => {
      const fn = math[name];

      const fnBigNumber = (x: BigNumber) => {
        return fn(math.multiply(x, math.divide(math.pi, math.bignumber(180))));
      };

      // create a typed-function which check the input types
      replacements[name] = math.typed(name, {
        BigNumber: fnBigNumber,
        "Array | Matrix": (x) => {
          return math.map(x, fnBigNumber);
        },
      });
    });

    const fns2: (keyof typeof math)[] = [
      "asin",
      "acos",
      "atan",
      "atan2",
      "acot",
      "acsc",
      "asec",
    ];
    fns2.forEach((name) => {
      const fn = math[name];

      const fnBigNumber = (x: BigNumber) => {
        const result = fn(x);
        return math.multiply(result, math.divide(math.bignumber(180), math.pi));
      };

      replacements[name] = math.typed(name, {
        BigNumber: fnBigNumber,
        "Array | Matrix": function (x) {
          return math.map(x, fnBigNumber);
        },
      });
    });

    math.import(replacements, { override: true });
    this.math = math;
  }

  evaluate(expr: string, scope?: object) {
    let ans = "";
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "/") {
        i++;
        expr = expr.slice(0, i) + "(" + expr.slice(i);

        let index = expr.indexOf(")", i);
        if (index < 0) {
          index = expr.length;
        }

        expr = expr.slice(0, index) + ")" + expr.slice(index);
      }
    }

    expr = expr.split(":").join("/");

    try {
      ans = this.math.evaluate(expr, scope);

      if (typeof ans === "function") {
        ans = "Error";
      }
    } catch {
      ans = "Error";
    }

    return ans;
  }
}

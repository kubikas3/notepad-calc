import { all, create } from "mathjs";

const math = create(all, {
    number: 'BigNumber',
    precision: 32
});

export const evaluate = (expr, scope) => {
    let ans = '';
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '/') {
            i++;
            expr = expr.slice(0, i) + '(' + expr.slice(i);

            let index = expr.indexOf(')', i);
            if (index < 0) {
                index = expr.length;
            }

            expr = expr.slice(0, index) + ')' + expr.slice(index);
        }
    }

    expr = expr.split(':').join('/');

    try {
        ans = math.evaluate(expr, scope);

        if (typeof ans === 'function') {
            ans = 'Error';
        }
    } catch {
        ans = 'Error';
    }

    return ans;
};

let replacements = {};

const fns1 = ['sin', 'cos', 'tan', 'sec', 'cot', 'csc'];
fns1.forEach(function (name) {
    const fn = math[name]

    const fnBigNumber = function (x) {
        return fn(math.multiply(x, math.divide(math.pi, math.bignumber(180))));
    };

    // create a typed-function which check the input types
    replacements[name] = math.typed(name, {
        'BigNumber': fnBigNumber,
        'Array | Matrix': function (x) {
            return math.map(x, fnBigNumber)
        }
    });
});

const fns2 = ['asin', 'acos', 'atan', 'atan2', 'acot', 'acsc', 'asec'];
fns2.forEach(function (name) {
    const fn = math[name]

    const fnBigNumber = function (x) {
        const result = fn(x)
        return math.multiply(result, math.divide(math.bignumber(180), math.pi));
    };

    replacements[name] = math.typed(name, {
        'BigNumber': fnBigNumber,
        'Array | Matrix': function (x) {
            return math.map(x, fnBigNumber)
        }
    })
});

math.import(replacements, { override: true });

export default math;

const functionNames = [
    "isNumber",
    "isComplex",
    "isBigNumber",
    "isFraction",
    "isUnit",
    "isString",
    "isArray",
    "isMatrix",
    "isCollection",
    "isDenseMatrix",
    "isSparseMatrix",
    "isRange",
    "isIndex",
    "isBoolean",
    "isResultSet",
    "isHelp",
    "isFunction",
    "isDate",
    "isRegExp",
    "isObject",
    "isNull",
    "isUndefined",
    "isAccessorNode",
    "isArrayNode",
    "isAssignmentNode",
    "isBlockNode",
    "isConditionalNode",
    "isConstantNode",
    "isFunctionAssignmentNode",
    "isFunctionNode",
    "isIndexNode",
    "isNode",
    "isObjectNode",
    "isOperatorNode",
    "isParenthesisNode",
    "isRangeNode",
    "isSymbolNode",
    "isChain",
    "on",
    "off",
    "once",
    "emit",
    "config",
    "import",
    "create",
    "factory",
    "typed",
    "ResultSet",
    "BigNumber",
    "Complex",
    "Fraction",
    "Range",
    "Matrix",
    "DenseMatrix",
    "clone",
    "isInteger",
    "isNegative",
    "isNumeric",
    "hasNumericValue",
    "isPositive",
    "isZero",
    "isNaN",
    "typeOf",
    "equalScalar",
    "SparseMatrix",
    "number",
    "string",
    "boolean",
    "bignumber",
    "complex",
    "fraction",
    "matrix",
    "matrixFromFunction",
    "matrixFromRows",
    "matrixFromColumns",
    "splitUnit",
    "unaryMinus",
    "unaryPlus",
    "abs",
    "apply",
    "addScalar",
    "cbrt",
    "ceil",
    "cube",
    "exp",
    "expm1",
    "fix",
    "floor",
    "gcd",
    "lcm",
    "log10",
    "log2",
    "mod",
    "multiplyScalar",
    "multiply",
    "nthRoot",
    "sign",
    "sqrt",
    "square",
    "subtract",
    "xgcd",
    "dotMultiply",
    "bitAnd",
    "bitNot",
    "bitOr",
    "bitXor",
    "arg",
    "conj",
    "im",
    "re",
    "not",
    "or",
    "xor",
    "concat",
    "column",
    "count",
    "cross",
    "diag",
    "filter",
    "flatten",
    "forEach",
    "getMatrixDataType",
    "identity",
    "kron",
    "map",
    "diff",
    "ones",
    "range",
    "reshape",
    "resize",
    "rotate",
    "rotationMatrix",
    "row",
    "size",
    "squeeze",
    "subset",
    "transpose",
    "ctranspose",
    "zeros",
    "erf",
    "mode",
    "prod",
    "format",
    "bin",
    "oct",
    "hex",
    "print",
    "to",
    "isPrime",
    "numeric",
    "divideScalar",
    "pow",
    "round",
    "log",
    "log1p",
    "nthRoots",
    "dotPow",
    "dotDivide",
    "lsolve",
    "usolve",
    "lsolveAll",
    "usolveAll",
    "leftShift",
    "rightArithShift",
    "rightLogShift",
    "and",
    "compare",
    "compareNatural",
    "compareText",
    "equal",
    "equalText",
    "smaller",
    "smallerEq",
    "larger",
    "largerEq",
    "deepEqual",
    "unequal",
    "partitionSelect",
    "sort",
    "max",
    "min",
    "ImmutableDenseMatrix",
    "Index",
    "FibonacciHeap",
    "Spa",
    "Unit",
    "unit",
    "sparse",
    "createUnit",
    "acos",
    "acosh",
    "acot",
    "acoth",
    "acsc",
    "acsch",
    "asec",
    "asech",
    "asin",
    "asinh",
    "atan",
    "atan2",
    "atanh",
    "cos",
    "cosh",
    "cot",
    "coth",
    "csc",
    "csch",
    "sec",
    "sech",
    "sin",
    "sinh",
    "tan",
    "tanh",
    "setCartesian",
    "setDifference",
    "setDistinct",
    "setIntersect",
    "setIsSubset",
    "setMultiplicity",
    "setPowerset",
    "setSize",
    "setSymDifference",
    "setUnion",
    "add",
    "hypot",
    "norm",
    "dot",
    "trace",
    "index",
    "Node",
    "AccessorNode",
    "ArrayNode",
    "AssignmentNode",
    "BlockNode",
    "ConditionalNode",
    "ConstantNode",
    "FunctionAssignmentNode",
    "IndexNode",
    "ObjectNode",
    "OperatorNode",
    "ParenthesisNode",
    "RangeNode",
    "RelationalNode",
    "SymbolNode",
    "FunctionNode",
    "parse",
    "compile",
    "evaluate",
    "Parser",
    "parser",
    "lup",
    "qr",
    "slu",
    "lusolve",
    "Help",
    "Chain",
    "help",
    "chain",
    "det",
    "inv",
    "eigs",
    "expm",
    "sqrtm",
    "divide",
    "distance",
    "intersect",
    "sum",
    "mean",
    "median",
    "mad",
    "variance",
    "quantileSeq",
    "std",
    "combinations",
    "combinationsWithRep",
    "gamma",
    "factorial",
    "kldivergence",
    "multinomial",
    "permutations",
    "pickRandom",
    "random",
    "randomInt",
    "stirlingS2",
    "bellNumbers",
    "catalan",
    "composition",
    "simplify",
    "derivative",
    "rationalize",
    "reviver",
    "replacer",
    "ArgumentsError",
    "DimensionError",
    "IndexError"
];
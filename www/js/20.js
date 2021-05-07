(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js ***!
  \****************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '//',\r\n        blockComment: ['(*', '*)']\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' }\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: \"'\", close: \"'\" }\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp('^\\\\s*//\\\\s*#region\\\\b|^\\\\s*\\\\(\\\\*\\\\s*#region(.*)\\\\*\\\\)'),\r\n            end: new RegExp('^\\\\s*//\\\\s*#endregion\\\\b|^\\\\s*\\\\(\\\\*\\\\s*#endregion\\\\s*\\\\*\\\\)')\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.fs',\r\n    keywords: [\r\n        'abstract',\r\n        'and',\r\n        'atomic',\r\n        'as',\r\n        'assert',\r\n        'asr',\r\n        'base',\r\n        'begin',\r\n        'break',\r\n        'checked',\r\n        'component',\r\n        'const',\r\n        'constraint',\r\n        'constructor',\r\n        'continue',\r\n        'class',\r\n        'default',\r\n        'delegate',\r\n        'do',\r\n        'done',\r\n        'downcast',\r\n        'downto',\r\n        'elif',\r\n        'else',\r\n        'end',\r\n        'exception',\r\n        'eager',\r\n        'event',\r\n        'external',\r\n        'extern',\r\n        'false',\r\n        'finally',\r\n        'for',\r\n        'fun',\r\n        'function',\r\n        'fixed',\r\n        'functor',\r\n        'global',\r\n        'if',\r\n        'in',\r\n        'include',\r\n        'inherit',\r\n        'inline',\r\n        'interface',\r\n        'internal',\r\n        'land',\r\n        'lor',\r\n        'lsl',\r\n        'lsr',\r\n        'lxor',\r\n        'lazy',\r\n        'let',\r\n        'match',\r\n        'member',\r\n        'mod',\r\n        'module',\r\n        'mutable',\r\n        'namespace',\r\n        'method',\r\n        'mixin',\r\n        'new',\r\n        'not',\r\n        'null',\r\n        'of',\r\n        'open',\r\n        'or',\r\n        'object',\r\n        'override',\r\n        'private',\r\n        'parallel',\r\n        'process',\r\n        'protected',\r\n        'pure',\r\n        'public',\r\n        'rec',\r\n        'return',\r\n        'static',\r\n        'sealed',\r\n        'struct',\r\n        'sig',\r\n        'then',\r\n        'to',\r\n        'true',\r\n        'tailcall',\r\n        'trait',\r\n        'try',\r\n        'type',\r\n        'upcast',\r\n        'use',\r\n        'val',\r\n        'void',\r\n        'virtual',\r\n        'volatile',\r\n        'when',\r\n        'while',\r\n        'with',\r\n        'yield'\r\n    ],\r\n    // we include these common regular expressions\r\n    symbols: /[=><!~?:&|+\\-*\\^%;\\.,\\/]+/,\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    integersuffix: /[uU]?[yslnLI]?/,\r\n    floatsuffix: /[fFmM]?/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            // identifiers and keywords\r\n            [\r\n                /[a-zA-Z_]\\w*/,\r\n                {\r\n                    cases: {\r\n                        '@keywords': { token: 'keyword.$0' },\r\n                        '@default': 'identifier'\r\n                    }\r\n                }\r\n            ],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // [< attributes >].\r\n            [/\\[<.*>\\]/, 'annotation'],\r\n            // Preprocessor directive\r\n            [/^#(if|else|endif)/, 'keyword'],\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/[<>](?!@symbols)/, '@brackets'],\r\n            [/@symbols/, 'delimiter'],\r\n            // numbers\r\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/0x[0-9a-fA-F]+LF/, 'number.float'],\r\n            [/0x[0-9a-fA-F]+(@integersuffix)/, 'number.hex'],\r\n            [/0b[0-1]+(@integersuffix)/, 'number.bin'],\r\n            [/\\d+(@integersuffix)/, 'number'],\r\n            // delimiter: after number because of .\\d floats\r\n            [/[;,.]/, 'delimiter'],\r\n            // strings\r\n            [/\"([^\"\\\\]|\\\\.)*$/, 'string.invalid'],\r\n            [/\"\"\"/, 'string', '@string.\"\"\"'],\r\n            [/\"/, 'string', '@string.\"'],\r\n            // literal string\r\n            [/\\@\"/, { token: 'string.quote', next: '@litstring' }],\r\n            // characters\r\n            [/'[^\\\\']'B?/, 'string'],\r\n            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],\r\n            [/'/, 'string.invalid']\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            [/\\(\\*(?!\\))/, 'comment', '@comment'],\r\n            [/\\/\\/.*$/, 'comment']\r\n        ],\r\n        comment: [\r\n            [/[^*(]+/, 'comment'],\r\n            [/\\*\\)/, 'comment', '@pop'],\r\n            [/\\*/, 'comment'],\r\n            [/\\(\\*\\)/, 'comment'],\r\n            [/\\(/, 'comment']\r\n        ],\r\n        string: [\r\n            [/[^\\\\\"]+/, 'string'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [\r\n                /(\"\"\"|\"B?)/,\r\n                {\r\n                    cases: {\r\n                        '$#==$S2': { token: 'string', next: '@pop' },\r\n                        '@default': 'string'\r\n                    }\r\n                }\r\n            ]\r\n        ],\r\n        litstring: [\r\n            [/[^\"]+/, 'string'],\r\n            [/\"\"/, 'string.escape'],\r\n            [/\"/, { token: 'string.quote', next: '@pop' }]\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js?");

/***/ })

}]);
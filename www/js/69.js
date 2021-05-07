(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.js ***!
  \********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\nvar conf = {\r\n    comments: {\r\n        lineComment: \"'\",\r\n        blockComment: ['/*', '*/']\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')'],\r\n        ['<', '>'],\r\n        ['addhandler', 'end addhandler'],\r\n        ['class', 'end class'],\r\n        ['enum', 'end enum'],\r\n        ['event', 'end event'],\r\n        ['function', 'end function'],\r\n        ['get', 'end get'],\r\n        ['if', 'end if'],\r\n        ['interface', 'end interface'],\r\n        ['module', 'end module'],\r\n        ['namespace', 'end namespace'],\r\n        ['operator', 'end operator'],\r\n        ['property', 'end property'],\r\n        ['raiseevent', 'end raiseevent'],\r\n        ['removehandler', 'end removehandler'],\r\n        ['select', 'end select'],\r\n        ['set', 'end set'],\r\n        ['structure', 'end structure'],\r\n        ['sub', 'end sub'],\r\n        ['synclock', 'end synclock'],\r\n        ['try', 'end try'],\r\n        ['while', 'end while'],\r\n        ['with', 'end with'],\r\n        ['using', 'end using'],\r\n        ['do', 'loop'],\r\n        ['for', 'next']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}', notIn: ['string', 'comment'] },\r\n        { open: '[', close: ']', notIn: ['string', 'comment'] },\r\n        { open: '(', close: ')', notIn: ['string', 'comment'] },\r\n        { open: '\"', close: '\"', notIn: ['string', 'comment'] },\r\n        { open: '<', close: '>', notIn: ['string', 'comment'] }\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp('^\\\\s*#Region\\\\b'),\r\n            end: new RegExp('^\\\\s*#End Region\\\\b')\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.vb',\r\n    ignoreCase: true,\r\n    brackets: [\r\n        { token: 'delimiter.bracket', open: '{', close: '}' },\r\n        { token: 'delimiter.array', open: '[', close: ']' },\r\n        { token: 'delimiter.parenthesis', open: '(', close: ')' },\r\n        { token: 'delimiter.angle', open: '<', close: '>' },\r\n        // Special bracket statement pairs\r\n        // according to https://msdn.microsoft.com/en-us/library/tsw2a11z.aspx\r\n        {\r\n            token: 'keyword.tag-addhandler',\r\n            open: 'addhandler',\r\n            close: 'end addhandler'\r\n        },\r\n        { token: 'keyword.tag-class', open: 'class', close: 'end class' },\r\n        { token: 'keyword.tag-enum', open: 'enum', close: 'end enum' },\r\n        { token: 'keyword.tag-event', open: 'event', close: 'end event' },\r\n        {\r\n            token: 'keyword.tag-function',\r\n            open: 'function',\r\n            close: 'end function'\r\n        },\r\n        { token: 'keyword.tag-get', open: 'get', close: 'end get' },\r\n        { token: 'keyword.tag-if', open: 'if', close: 'end if' },\r\n        {\r\n            token: 'keyword.tag-interface',\r\n            open: 'interface',\r\n            close: 'end interface'\r\n        },\r\n        { token: 'keyword.tag-module', open: 'module', close: 'end module' },\r\n        {\r\n            token: 'keyword.tag-namespace',\r\n            open: 'namespace',\r\n            close: 'end namespace'\r\n        },\r\n        {\r\n            token: 'keyword.tag-operator',\r\n            open: 'operator',\r\n            close: 'end operator'\r\n        },\r\n        {\r\n            token: 'keyword.tag-property',\r\n            open: 'property',\r\n            close: 'end property'\r\n        },\r\n        {\r\n            token: 'keyword.tag-raiseevent',\r\n            open: 'raiseevent',\r\n            close: 'end raiseevent'\r\n        },\r\n        {\r\n            token: 'keyword.tag-removehandler',\r\n            open: 'removehandler',\r\n            close: 'end removehandler'\r\n        },\r\n        { token: 'keyword.tag-select', open: 'select', close: 'end select' },\r\n        { token: 'keyword.tag-set', open: 'set', close: 'end set' },\r\n        {\r\n            token: 'keyword.tag-structure',\r\n            open: 'structure',\r\n            close: 'end structure'\r\n        },\r\n        { token: 'keyword.tag-sub', open: 'sub', close: 'end sub' },\r\n        {\r\n            token: 'keyword.tag-synclock',\r\n            open: 'synclock',\r\n            close: 'end synclock'\r\n        },\r\n        { token: 'keyword.tag-try', open: 'try', close: 'end try' },\r\n        { token: 'keyword.tag-while', open: 'while', close: 'end while' },\r\n        { token: 'keyword.tag-with', open: 'with', close: 'end with' },\r\n        // Other pairs\r\n        { token: 'keyword.tag-using', open: 'using', close: 'end using' },\r\n        { token: 'keyword.tag-do', open: 'do', close: 'loop' },\r\n        { token: 'keyword.tag-for', open: 'for', close: 'next' }\r\n    ],\r\n    keywords: [\r\n        'AddHandler',\r\n        'AddressOf',\r\n        'Alias',\r\n        'And',\r\n        'AndAlso',\r\n        'As',\r\n        'Async',\r\n        'Boolean',\r\n        'ByRef',\r\n        'Byte',\r\n        'ByVal',\r\n        'Call',\r\n        'Case',\r\n        'Catch',\r\n        'CBool',\r\n        'CByte',\r\n        'CChar',\r\n        'CDate',\r\n        'CDbl',\r\n        'CDec',\r\n        'Char',\r\n        'CInt',\r\n        'Class',\r\n        'CLng',\r\n        'CObj',\r\n        'Const',\r\n        'Continue',\r\n        'CSByte',\r\n        'CShort',\r\n        'CSng',\r\n        'CStr',\r\n        'CType',\r\n        'CUInt',\r\n        'CULng',\r\n        'CUShort',\r\n        'Date',\r\n        'Decimal',\r\n        'Declare',\r\n        'Default',\r\n        'Delegate',\r\n        'Dim',\r\n        'DirectCast',\r\n        'Do',\r\n        'Double',\r\n        'Each',\r\n        'Else',\r\n        'ElseIf',\r\n        'End',\r\n        'EndIf',\r\n        'Enum',\r\n        'Erase',\r\n        'Error',\r\n        'Event',\r\n        'Exit',\r\n        'False',\r\n        'Finally',\r\n        'For',\r\n        'Friend',\r\n        'Function',\r\n        'Get',\r\n        'GetType',\r\n        'GetXMLNamespace',\r\n        'Global',\r\n        'GoSub',\r\n        'GoTo',\r\n        'Handles',\r\n        'If',\r\n        'Implements',\r\n        'Imports',\r\n        'In',\r\n        'Inherits',\r\n        'Integer',\r\n        'Interface',\r\n        'Is',\r\n        'IsNot',\r\n        'Let',\r\n        'Lib',\r\n        'Like',\r\n        'Long',\r\n        'Loop',\r\n        'Me',\r\n        'Mod',\r\n        'Module',\r\n        'MustInherit',\r\n        'MustOverride',\r\n        'MyBase',\r\n        'MyClass',\r\n        'NameOf',\r\n        'Namespace',\r\n        'Narrowing',\r\n        'New',\r\n        'Next',\r\n        'Not',\r\n        'Nothing',\r\n        'NotInheritable',\r\n        'NotOverridable',\r\n        'Object',\r\n        'Of',\r\n        'On',\r\n        'Operator',\r\n        'Option',\r\n        'Optional',\r\n        'Or',\r\n        'OrElse',\r\n        'Out',\r\n        'Overloads',\r\n        'Overridable',\r\n        'Overrides',\r\n        'ParamArray',\r\n        'Partial',\r\n        'Private',\r\n        'Property',\r\n        'Protected',\r\n        'Public',\r\n        'RaiseEvent',\r\n        'ReadOnly',\r\n        'ReDim',\r\n        'RemoveHandler',\r\n        'Resume',\r\n        'Return',\r\n        'SByte',\r\n        'Select',\r\n        'Set',\r\n        'Shadows',\r\n        'Shared',\r\n        'Short',\r\n        'Single',\r\n        'Static',\r\n        'Step',\r\n        'Stop',\r\n        'String',\r\n        'Structure',\r\n        'Sub',\r\n        'SyncLock',\r\n        'Then',\r\n        'Throw',\r\n        'To',\r\n        'True',\r\n        'Try',\r\n        'TryCast',\r\n        'TypeOf',\r\n        'UInteger',\r\n        'ULong',\r\n        'UShort',\r\n        'Using',\r\n        'Variant',\r\n        'Wend',\r\n        'When',\r\n        'While',\r\n        'Widening',\r\n        'With',\r\n        'WithEvents',\r\n        'WriteOnly',\r\n        'Xor'\r\n    ],\r\n    tagwords: [\r\n        'If',\r\n        'Sub',\r\n        'Select',\r\n        'Try',\r\n        'Class',\r\n        'Enum',\r\n        'Function',\r\n        'Get',\r\n        'Interface',\r\n        'Module',\r\n        'Namespace',\r\n        'Operator',\r\n        'Set',\r\n        'Structure',\r\n        'Using',\r\n        'While',\r\n        'With',\r\n        'Do',\r\n        'Loop',\r\n        'For',\r\n        'Next',\r\n        'Property',\r\n        'Continue',\r\n        'AddHandler',\r\n        'RemoveHandler',\r\n        'Event',\r\n        'RaiseEvent',\r\n        'SyncLock'\r\n    ],\r\n    // we include these common regular expressions\r\n    symbols: /[=><!~?;\\.,:&|+\\-*\\/\\^%]+/,\r\n    integersuffix: /U?[DI%L&S@]?/,\r\n    floatsuffix: /[R#F!]?/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // special ending tag-words\r\n            [/next(?!\\w)/, { token: 'keyword.tag-for' }],\r\n            [/loop(?!\\w)/, { token: 'keyword.tag-do' }],\r\n            // usual ending tags\r\n            [\r\n                /end\\s+(?!for|do)(addhandler|class|enum|event|function|get|if|interface|module|namespace|operator|property|raiseevent|removehandler|select|set|structure|sub|synclock|try|while|with|using)/,\r\n                { token: 'keyword.tag-$1' }\r\n            ],\r\n            // identifiers, tagwords, and keywords\r\n            [\r\n                /[a-zA-Z_]\\w*/,\r\n                {\r\n                    cases: {\r\n                        '@tagwords': { token: 'keyword.tag-$0' },\r\n                        '@keywords': { token: 'keyword.$0' },\r\n                        '@default': 'identifier'\r\n                    }\r\n                }\r\n            ],\r\n            // Preprocessor directive\r\n            [/^\\s*#\\w+/, 'keyword'],\r\n            // numbers\r\n            [/\\d*\\d+e([\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/\\d*\\.\\d+(e[\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/&H[0-9a-f]+(@integersuffix)/, 'number.hex'],\r\n            [/&0[0-7]+(@integersuffix)/, 'number.octal'],\r\n            [/\\d+(@integersuffix)/, 'number'],\r\n            // date literal\r\n            [/#.*#/, 'number'],\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/@symbols/, 'delimiter'],\r\n            // strings\r\n            [/[\"\\u201c\\u201d]/, { token: 'string.quote', next: '@string' }]\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            [/(\\'|REM(?!\\w)).*$/, 'comment']\r\n        ],\r\n        string: [\r\n            [/[^\"\\u201c\\u201d]+/, 'string'],\r\n            [/[\"\\u201c\\u201d]{2}/, 'string.escape'],\r\n            [/[\"\\u201c\\u201d]C?/, { token: 'string.quote', next: '@pop' }]\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.js?");

/***/ })

}]);
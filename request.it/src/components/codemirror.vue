<template>
  <div></div>
</template>

<script lang="js">
// Main CSS
import 'codemirror/lib/codemirror.css'

// Addons CSS
import 'codemirror/addon/fold/foldgutter.css'

// Addons
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/hint/show-hint'

// Modes
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

import CM from "codemirror";

export default {
  props: ["value"],
  data() {
    return {
      cm: null,
    };
  },
  mounted() {
    this.cm = CM(this.$el, {
        mode: "javascript",
        theme: 'vscode-dark',
        value: this.value,
        lineWrapping: true,
        readOnly: true,
        foldGutter: true,
        lineNumbers: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    });
  },
};
</script>
<style>
/**
    *	@package    vscode-dark theme
    *	@version    1.0.0
    *	@author		  Inter-Net PRO
    *	@link       https://inter-net.pro
    *	@github     https://github.com/Inter-Net-Pro/Theme-VSCode-Dark
    */
.cm-s-vscode-dark span.cm-meta {
  color: #569cd6;
}
.cm-s-vscode-dark span.cm-number {
  color: #b5cea8;
}
.cm-s-vscode-dark span.cm-keyword {
  line-height: 1em;
  font-weight: bold;
  color: var(--vscode-symbolIcon-keywordForeground);
}
.cm-s-vscode-dark span.cm-def {
  color: #9cdcfe;
}
.cm-s-vscode-dark span.cm-variable {
  color: var(--vscode-symbolIcon-variableForeground);
}
.cm-s-vscode-dark span.cm-variable-2 {
  color: #9cdcfe;
}
.cm-s-vscode-dark span.cm-variable-3,
.cm-s-vscode-dark span.cm-type {
  color: #A9B7C6;
}
.cm-s-vscode-dark span.cm-property {
  color: var(--vscode-symbolIcon-propertyForeground);
}
.cm-s-vscode-dark span.cm-operator {
  color: var(--vscode-symbolIcon-operatorForeground);
}
.cm-s-vscode-dark span.cm-string {
  color: var(--vscode-debugTokenExpression-string);
}
.cm-s-vscode-dark span.cm-string-2 {
  color: #6A8759;
}
.cm-s-vscode-dark span.cm-comment {
  color: #6A9955;
}
.cm-s-vscode-dark span.cm-link {
  color: var(--vscode-textLink-foreground);
}
.cm-s-vscode-dark span.cm-atom {
  color: #569cd6;
}
.cm-s-vscode-dark span.cm-error {
  color: var(--vscode-errorForeground);
}
.cm-s-vscode-dark span.cm-tag {
  color: #569cd6;
}
.cm-s-vscode-dark span.cm-attribute {
  color: #9cdcfe;
}
.cm-s-vscode-dark span.cm-qualifier {
  color: #d7ba7d;
}
.cm-s-vscode-dark span.cm-bracket {
  color: #808080;
}

.cm-s-vscode-dark.CodeMirror {
  background: var(--vscode-editor-background);
  color: var(--vscode-editor-foreground);
}
.cm-s-vscode-dark .CodeMirror-cursor {
  border-left: 1px solid #bebebe;
}
.CodeMirror-activeline-background {
  background: #3A3A3A;
}
.cm-s-vscode-dark div.CodeMirror-selected {
  background: #1e496c;
}
.cm-s-vscode-dark .CodeMirror-gutters {
  background: var(--vscode-editorGutter-background);
  color: var(--vscode-editorLineNumber-foreground);
  border: none;
}

.cm-s-vscode-dark span.cm-builtin {
  color: #A9B7C6;
}
.cm-s-vscode-dark {
  font-family: var(--vscode-editor-font-family);
  font-weight: var(--vscode-editor-font-weight);
  font-size: var(--vscode-editor-font-size);
}
.cm-s-vscode-dark .CodeMirror-matchingbracket {
  background-color: #3b514d;
  color: yellow !important;
}

.CodeMirror-hints.vscode-dark {
  font-family: Consolas, "Courier New", monospace;
  color: #9c9e9e;
  background-color: #3b3e3f !important;
}

.CodeMirror-hints.vscode-dark .CodeMirror-hint-active {
  background-color: #494d4e !important;
  color: #9c9e9e !important;
}
</style>
<template>
  <button :class="['r-button', {
    'r-button--block': block,
    'r-button--secondary': secondary,
  }]">
    <slot></slot>
  </button>
</template>

<style>
.r-button {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  outline: none;
  padding: 0.4em 1em;
  margin: 0.25em;
  cursor: pointer;
}

.r-button--block {
  display: block;
  width: 100%;
}

.r-button:hover {
  background: var(--vscode-button-hoverBackground);
}

.r-button--secondary {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
}

.r-button--secondary:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop(Boolean)
  secondary !: boolean

  @Prop(Boolean)
  block !: boolean
}
</script>

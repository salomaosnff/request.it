<template>
  <button class="r-button"><slot></slot></button>
</template>

<style>
.r-button {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  outline: none;
}

.r-button:hover {
  background: var(--vscode-button-hoverBackground);
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

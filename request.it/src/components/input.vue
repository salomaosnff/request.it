<template>
  <input
    v-model="currentValue"
    type="text"
    class="r-input"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RInput extends Vue {
  @Prop(String)
  public value!: string;

  get currentValue(): string {
    return this.value;
  }

  set currentValue(value: string) {
    this.$emit("input", value);
  }
}
</script>

<style>
.r-input {
  font: inherit;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid transparent;
  padding: 0.25em 0.5em;
  outline: none;
}

.r-input::placeholder {
  color: var(--vscode-input-placeholderForeground);
}

.r-input:focus {
  outline-color: var(--vscode-focusBorder);
}
</style>


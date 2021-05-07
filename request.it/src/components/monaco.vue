<template>
  <div class="r-monaco"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as monaco from "monaco-editor";

@Component
export default class RMonaco extends Vue {
  @Prop(String) public language!: string;
  @Prop(String) public value!: string;

  public monaco: monaco.editor.IStandaloneCodeEditor | null = null;

  public mounted(): void {
    this.monaco = monaco.editor.create(this.$el as HTMLElement, {
      readOnly: true,
      language: this.language,
      value: this.value,
      theme: "vs-dark",
    });
  }

  public beforeDestroy(): void {
    this.monaco?.dispose();
  }
}
</script>

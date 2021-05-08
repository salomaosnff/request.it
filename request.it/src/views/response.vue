<template>
  <div class="r-response">
    <h1 class="r-response__title">Response</h1>

    <div v-if="response">
      <h4>Status: {{ response.status }}</h4>
      <h4>Status Text: {{ response.statusText }}</h4>

      <highlightjs
        class="r-response__editor"
        :language="responseType"
        :code="responseString"
      />
    </div>
  </div>
</template>

<style>
.r-response {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.r-response .r-response__editor {
  flex: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Response } from "@/lib/response";

@Component
export default class RResponse extends Vue {
  public response: Response | null = null;

  get responseString(): string {
    return JSON.stringify(this.response?.data, null, 2);
  }

  get responseType(): any {
    return "json";
  }

  public created(): void {
    this.$commands.commands.set("response", (response) => {
      delete response.body;
      this.response = response;
    });
  }
}
</script>

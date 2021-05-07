<template>
  <div class="r-response">
    <h1 class="r-response__title">Response</h1>

    <r-editor
      class="r-response__editor"
      v-if="response"
      :value="responseString"
      :language="responseType"
    ></r-editor>
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
import REditor from "@/components/monaco.vue";
import * as monaco from "monaco-editor";

@Component({
  components: {
    REditor,
  },
})
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

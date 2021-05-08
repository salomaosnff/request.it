<template>
  <div class="r-response">
    <h1 class="r-response__title">Response</h1>

    <r-code-mirror
      v-if="response"
      class="r-response__editor"
      :mode="responseType"
      :value="responseString"
    />
  </div>
</template>

<style>
.r-response {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.r-response__editor {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.r-response__editor .CodeMirror {
  flex: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Response } from "@/lib/response";
import RCodeMirror from '@/components/codemirror.vue'

@Component({
  components: {
    RCodeMirror
  }
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

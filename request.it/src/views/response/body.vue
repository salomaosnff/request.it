<template>
  <div v-if="response" class="r-response-body">
    <label>
      <input type="checkbox" v-model="format" />
      Beautify
    </label>
    <r-code-mirror
      class="r-response-body__code"
      :mode="response.contentType"
      :value="responseString"
      :readOnly="true"
    />
  </div>
  <h1 v-else>Nenhuma resposta</h1>
</template>

<script lang="ts">
import { Response } from "@/lib/response";
import { Vue, Component, Prop } from "vue-property-decorator";
import RCodeMirror from "@/components/codemirror.vue";
import * as jsbeautify from "js-beautify";

@Component({
  components: {
    RCodeMirror,
  },
})
export default class ResponseBodyView extends Vue {
  @Prop(Object)
  public response!: Response;

  public format = false;

  get responseString(): string {
    if (!this.format) {
      return this.response.data;
    }

    if (
      this.response?.contentType === "json" ||
      this.response?.contentType === "javascript"
    ) {
      return jsbeautify.js_beautify(this.response.data);
    }

    if (
      this.response.contentType === "xml" ||
      this.response.contentType === "html"
    ) {
      return jsbeautify.html_beautify(this.response.data);
    }

    if (this.response.contentType === "css") {
      return jsbeautify.css_beautify(this.response.data);
    }

    return this.response.data;
  }
}
</script>

<style>
.r-response-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.r-response-body__code {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.r-response-body__code > .CodeMirror {
  flex: 1;
}
</style>

<template>
  <div>
    <select
      v-model="request.contentType"
      class="r-input"
      @change="onChangeBody"
    >
      <option value="json">JSON</option>
      <option value="xml">XML</option>
      <option value="text">Text</option>
      <option value="binary">Raw</option>
      <option value="multipart">Multipart Form</option>
      <option value="urlencoded">URL Encoded</option>
    </select>

    <div
      v-if="
        request.contentType === 'multipart' ||
        request.contentType === 'urlencoded'
      "
    >
      <r-dictionary v-model="body"></r-dictionary>
    </div>

    <r-code-mirror
      v-else
      v-model="body"
      :mode="request.contentType"
    ></r-code-mirror>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RCodeMirror from "@/components/codemirror.vue";
import { Request } from "@/lib/request-file";
import RDictionary from "@/components/dictonary.vue";

@Component({
  components: { RCodeMirror, RDictionary },
})
export default class RBody extends Vue {
  public body: string = "";

  @Prop(Object) public request!: Request;

  @Watch("body")
  public onChangeBody(): void {
    this.$emit("update:request", {
      ...this.request,
      body: this.body,
    });
  }
}
</script>

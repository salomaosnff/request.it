<template>
  <div class="r-response">
    <h1 class="r-response__title">Response</h1>
    <div class="r-tab-group">
      <r-tab to="/response/body"> Body </r-tab>
      <r-tab to="/response/header"> Headers </r-tab>
    </div>
    <div class="r-response__content">
      <router-view :response="response"></router-view>
    </div>
  </div>
</template>

<style>
.r-response {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.r-response__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Response } from "@/lib/response";
import RCodeMirror from '@/components/codemirror.vue'
import RTab from "@/components/tab-link.vue";


@Component({
  components: {
    RCodeMirror,
    RTab
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

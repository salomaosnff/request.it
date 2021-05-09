<template>
  <div class="r-response">
    <div class="r-response__header">
      <div class="r-response__header-status" v-if="response">
        <h1 class="r-response__header-status-text">
          {{ response.status }} {{ response.statusText }}
        </h1>
        <em>Response time: {{ responseTime }}</em>
      </div>
      <div class="r-tab-group">
        <r-tab to="/response/body"> Body </r-tab>
        <r-tab to="/response/header"> Headers </r-tab>
      </div>
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

.r-response__header {
  position: sticky;
  top: 0;
  background: var(--vscode-editor-background);
}

.r-response__header-status {
  margin: 6px 0;
}

.r-response__header-status > h1 {
  margin-bottom: 3px;
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
import RCodeMirror from "@/components/codemirror.vue";
import RTab from "@/components/tab-link.vue";

@Component({
  components: {
    RCodeMirror,
    RTab,
  },
})
export default class RResponse extends Vue {
  public response: Response | null = null;

  get responseTime(): string {
    const weights: [string, number][] = [
      ["ms", 1],
      ["s", 1000],
      ["m", 60000],
      ["h", 3600000],
    ];

    const responseTime = Math.trunc(this.response?.time ?? 1);
    let unit: [string, number] = weights[0];

    for (const [weightUnit, weightValue] of weights) {
      if (weightValue <= responseTime) {
        unit = [weightUnit, weightValue];
      } else {
        break;
      }
    }

    return `${(responseTime / unit[1]).toFixed(2)} ${unit[0]}`;
  }

  public created(): void {
    this.$commands.commands.set("response", (response) => {
      this.response = response;
    });
  }
}
</script>

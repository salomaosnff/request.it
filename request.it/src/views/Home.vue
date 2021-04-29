<template>
  <div class="home">
    <h1 style="color: var(--vscode-errorForeground)">aaaaaaaaaaaaa</h1>
    <r-button>xxxxx</r-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RButton from "@/components/button.vue";

@Component({
  components: { RButton },
})
export default class Home extends Vue {}
</script>

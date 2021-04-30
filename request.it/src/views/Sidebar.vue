<template>
  <div class="home">
    <r-button>Nova requisição</r-button>
    <r-button secondary>Nova requisição</r-button>
    <r-button block>Nova requisição</r-button>
    <r-button secondary block>Nova requisição</r-button>
    <!-- <div class="r-tabs">
      <r-tab-link>Histórico</r-tab-link>
      <r-tab-link>Coleções</r-tab-link>
      <r-tab-link>Variáveis</r-tab-link>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RButton from "@/components/button.vue";
import RTabLink from "@/components/TabLink.vue";

@Component({
  components: { RButton, RTabLink },
})
export default class Home extends Vue {}
</script>
<style>
.r-tabs {
  border-bottom: 2px solid red;
}
</style>
<template>
  <div>
    <h1>Response</h1>

    <pre v-if="response">
      {{ response }}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Response extends Vue {
  public response: Response | null = null;

  public created(): void {
    this.$commands.commands.set("response", (response) => {
      delete response.body;
      this.response = response;
    });
  }
}
</script>

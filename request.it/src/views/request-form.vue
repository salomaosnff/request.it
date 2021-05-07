<template>
  <div>
    <h1 contenteditable>Request</h1>
    <form class="r-form" @submit.prevent="onSendRequest">
      <select class="r-input">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>

      <r-input type="url" />

      <r-button>Send</r-button>
    </form>

    <div class="r-tab-group">
      <r-tab to="/request/body"> Body </r-tab>
      <r-tab to="/request/auth"> Auth </r-tab>
      <r-tab to="/request/query"> Query </r-tab>
      <r-tab to="/request/header"> Header </r-tab>
      <r-tab to="/request/docs"> Docs </r-tab>
    </div>

    <router-view></router-view>
  </div>
</template>

<style>
.r-form {
  display: flex;
  height: calc(1.618em * 1.618);
  margin-bottom: 0.25em;
}

.r-form > select {
  flex: 0 auto;
}

.r-form > input {
  flex: 1;
}

.r-form > .r-button {
  flex: 0 auto;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Command } from "@/lib/command";
import { Request } from "@/lib/request-file";
import RInput from "@/components/input.vue";
import RButton from "@/components/button.vue";
import RTab from "@/components/tab-link.vue";

@Component({
  components: { RInput, RButton, RTab },
})
export default class RequestForm extends Vue {
  public onSendRequest(): void {
    Command.call<Request>("request", {
      url: "{{baseUrl}}/rooms/browser",
      method: "GET",
      headers: {},
      query: {},
      vars: {
        baseUrl: "https://api.pubby.club",
      },
    });
  }
}
</script>

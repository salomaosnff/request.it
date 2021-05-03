<template>
  <div>
    <h1 contenteditable>Request</h1>
    <form action="" class="r-form">
      <select>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>

      <input type="url" />

      <r-button>Send</r-button>
    </form>

    <div>
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
}

.r-form > select {
  flex: 1;
}

.r-form > input {
  flex: 3;
}

.r-form > r-button {
  flex: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RButton from "@/components/button.vue";
import RTab from "@/components/TabLink.vue";

@Component({
  components: { RButton, RTab },
})
export default class RequestForm extends Vue {}
</script>

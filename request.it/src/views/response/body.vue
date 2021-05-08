<template>
    <r-code-mirror
      v-if="response"
      class="r-response__body"
      :mode="responseType"
      :value="responseString"
    />
    <h1 v-else>Nenhuma resposta</h1>
</template>
<script lang="ts">
import { Response } from '@/lib/response';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ResponseBodyView extends Vue {
    @Prop(Object)
    response !: Response
}
</script>

<style>
.r-response__body {
    flex: 1;
}
</style>

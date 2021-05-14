<template>
  <r-dictionary
    :value="request.headers"
    @input="$emit('update:request', { ...request, headers: $event })"
  ></r-dictionary>
</template>

<script lang="ts">
import { Request } from "@/lib/request-file";
import { Component, Prop, Vue } from "vue-property-decorator";
import RDictionary from "@/components/dictonary.vue";

@Component({
  components: { RDictionary },
})
export default class RRequestHeader extends Vue {
  @Prop(Object) public request!: Request;
}
</script>

<template>
  <div>
    <table class="r-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Descrição</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in entries" :key="index">
          <td>
            <r-input v-model="entry.name" @blur="updateValue" />
          </td>
          <td>
            <r-input v-model="entry.value" @blur="updateValue" />
          </td>
          <td>
            <r-input v-model="entry.description" @blur="updateValue" />
          </td>
          <td>
            <r-button @click="onExcludeEntry(index)">Excluir</r-button>
          </td>
        </tr>
      </tbody>
    </table>
    <r-button @click="onAddHeader">Adicionar</r-button>
  </div>
</template>

<style>
.r-table .r-input {
  width: 100%;
  background: none;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RInput from "@/components/input.vue";
import RButton from "@/components/button.vue";

@Component({
  components: { RInput, RButton },
})
export default class RDictonary extends Vue {
  public entries: { name: string; value: any; description: string }[] = [];

  @Prop(Object) public value!: Record<string, any>;

  @Watch("value", { immediate: true })
  public onChangeHeaders(entries: Record<string, any>): void {
    this.entries = Object.entries(entries).flatMap(([name, value]) => {
      if (Array.isArray(value)) {
        return value.map((value) => ({ name, value, description: "" }));
      }

      return {
        name,
        value,
        description: "",
      };
    });
  }

  public onAddHeader(): void {
    this.entries.push({ name: "", value: "", description: "" });
  }

  public onExcludeEntry(index: number): void {
    this.entries.splice(index, 1);
    this.updateValue();
  }

  public updateValue(): void {
    const value = this.entries.reduce<Record<string, any>>((acc, entry) => {
      if (!entry.name && !entry.value) {
        return acc;
      }

      if (acc[entry.name]) {
        acc[entry.name] = [].concat(acc[entry.name], entry.value);
      } else {
        acc[entry.name] = entry.value;
      }

      return acc;
    }, {});

    this.$emit("input", value);
  }
}
</script>

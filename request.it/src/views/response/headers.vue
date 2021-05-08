<template>
    <table class="r-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody v-if="response">
            <tr v-for="(value, name) in response.headers" :key="name">
                <td>{{ name }}</td>
                <td>{{ value }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Response } from '@/lib/response';

@Component
export default class ResponseHeadersView extends Vue {
    @Prop(Object)
    response !: Response
}
</script>

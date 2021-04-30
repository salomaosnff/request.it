<template>
    <router-link class="tab-link" :to="to">
        <slot></slot>
    </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TabLink extends Vue {
    @Prop(String)
    to !: string;
}
</script>

<template>
    <router-link class="r-tab-link" :to="to">
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

<style>
.r-tab-link {
    display: inline-block;
    padding: 0.5em 0.6em;
    color: var(--vscode-foreground);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    outline: 0 !important;
    margin-bottom: -1px;
}

.r-tab-link:hover {
    color: var(--vscode-tab-activeForeground);
}

.r-tab-link.router-link-active {
    border-bottom-color: var(--vscode-panelTitle-activeBorder);
    color: var(--vscode-tab-activeForeground);
}

.r-tab-group {
    border-bottom: 1px solid var(--vscode-dropdown-border);
}
</style>

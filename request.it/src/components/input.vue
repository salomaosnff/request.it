<template>
    <input type="text" class="r-input">
</template>
<style>
.r-input {
    font: inherit;
    background: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    border: 1px solid transparent;
    padding: 0.25em 0.5em;
    outline: none;
}

.r-input::placeholder {
    color: var(--vscode-input-placeholderForeground);
}

.r-input:focus {
    outline-color: var(--vscode-focusBorder);
}
</style>
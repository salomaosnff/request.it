<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

.r-table {
    width: 100%;
    border-collapse: collapse;
}

.r-table thead th {
    border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder);
    padding: 0.5em 0;
    text-align-last: left;
}

.r-table tbody tr:nth-child(2n+1) {
    background: #0002;
}

.r-table tbody td {
  padding: 0.25em;
}
</style>

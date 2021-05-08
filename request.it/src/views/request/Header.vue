<template>
    <table class="r-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in 10" :key="i">
                <td>Nome {{ i }}</td>
                <td>Valor {{ i }}</td>
                <td>Descrição {{ i }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>

</style>
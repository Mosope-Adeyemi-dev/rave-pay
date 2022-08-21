<template>
    <div>
        <h1>{{ transactionId }}</h1>
    </div>
</template>

<script>
    export default {
       layout: 'defaultLayout',
       data() {
        return {
            transactionId: this.$route.params.index,
        }
       }
    }
</script>

<style scoped>

</style>
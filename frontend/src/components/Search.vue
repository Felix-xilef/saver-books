<template>
    <Navbar/>
    <div class="purpleLight p-3">
        <form class="col-4 backgroundLightPurple borderPurple p-4">
            <div class="d-inline-flex align-items-center">
                <img src="" alt="filterIcon">
                <h5 class="ms-2 mb-0">Filtros</h5>
            </div>
            <div class="form-check">

            </div>
        </form>
        <div class="col">

        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar.vue"

    export default {
        name: 'Search',
        components: {
            Navbar
        }
    }
</script>

<style scoped>

</style>

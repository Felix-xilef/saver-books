<template>
    <nav class="navbar navbar-light backgroundGradientPurple">
        <div class="container-fluid justify-content-around">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand col-md-2" href="#">
                <img src="../assets/logo.svg" alt="logo do site" class="logo">
            </a>
            <form class="col-md-9">
                <div class="input-group me-2 bg-white">
                    <input class="form-control" type="search" :value="filtro" placeholder="digite para pesquisar...">
                    <button type="button" class="input-group-text btn btn-outline-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </nav>
    <div class="collapse" id="navbarToggleExternalContent">
        <div class="backgroundGradientPurple p-4">
            <h5 class="h4">Collapsed content</h5>
            <span class="">Toggleable via the navbar brand.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        props: {
            filtro: String
        }
    }
</script>

<style scoped>
    .navbar-toggler-icon {
        height: 36px;
        width: 36px;
    }

    .logo {
        max-height: 60px;
    }

    .input-group {
        border-radius: 20px;
    }

    input {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;

        border: none;
    }

    .btn {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;

        border: none;
    }
</style>

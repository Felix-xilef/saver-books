<template>
    <Navbar/>
    <div class="">
        <div class="row p-3">
            <form class="col-3 backgroundLightPurple borderPurple p-4">
                <div class="d-inline-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                    </svg>
                    <h5 class="ms-2 mb-0">Filtros</h5>
                </div>
                <div class="p-4">
                    <div v-for="filter in checkboxFilters" :key="filter.id" class="pb-3">
                        <h6>{{ filter.name }}</h6>
                        <div v-for="option in filter.content" class="form-check" :key="option.id">
                            <input class="form-check-input" type="checkbox" :id="'checkbox' + option">
                            <label class="form-check-label" :for="'checkbox' + option">
                                {{ option }}
                            </label>
                        </div>
                    </div>
                    <div>
                        <h6>Data de publicação</h6>
                        <div>
                            <div class="pb-2">
                                <label class="form-label pe-2" for="dateFrom">De:</label>
                                <input class="form-control" type="date" id="dateFrom">
                            </div>
                            <div>
                                <label class="form-label pe-2" for="dateFrom">Até:</label>
                                <input class="form-control" type="date" id="dateFrom">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="col">
                <div class="row row-cols-4">
                    <div v-for="book in books" class="col d-flex flex-column align-items-center p-3" :key="book.id">
                        <img :src="book.image" alt="Book cover">
                        <h5>{{ book.title }}</h5>
                        <h6>{{ book.author }}</h6>
                        <p class="summary">{{ book.summary }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar.vue"

    export default {
        name: 'Search',
        components: {
            Navbar
        },
        data() {
            return {
                checkboxFilters: [
                    {
                        name: 'idioma',
                        content: [
                            'português',
                            'inglês'
                        ]
                    },
                    {
                        name: 'autor',
                        content: [
                            'Machado de Assis',
                            'Mario de Andrade'
                        ]
                    },
                    {
                        name: 'editora',
                        content: [
                            'Abril',
                            'Alegra'
                        ]
                    },
                    {
                        name: 'genero',
                        content: [
                            'romance',
                            'suspense'
                        ]
                    },
                ],
                books: [
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                    {
                        id: 1,
                        image: '../assets/picture.png',
                        title: 'Título do Livro',
                        author: 'Autor do Livro',
                        summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aliquid earum vel impedit quis possimus ab! Quis, officia? Laboriosam, beatae alias repellat est excepturi error? Debitis ipsa magnam similique iure.'
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    .form-check-input, .form-check-label {
        cursor: pointer;
    }

    .form-control {
        border-radius: 20px;
    }

    .summary {
        text-align: justify;
    }
</style>

# saver-books

Feito com:

<div style="display: flex; justify-content: space-evenly; margin-bottom: 20px;">
    <a href="https://nodejs.org/">
        <img height="64" src="https://nodejs.org/static/images/logo.svg"></img>
    </a>
    <a href="https://typeorm.io/">
        <img style="background-color: rgba(255, 255, 255); border-radius: 5px;" height="64" src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png"></img>
    </a>
    <a href="https://v3.vuejs.org/" style="display: flex; align-items: center; text-decoration: none; color: inherit;">
        <img height="64" src="https://v3.vuejs.org/logo.png"></img>
        <p style="margin: 0; margin-left: 6px; font-size: 20pt;">Vue.js</p>
    </a>
</div>

## Requisitos

Para rodar o projeto é necessário ter o `Node.js` e a `Vue Cli` instalados:

- Para verificar se você tem o `Node.js` instalado execute o comando `'node --version'` como a seguir:

```
> node --version
v14.17.1
```

Caso a versão seja impressa na tela, como no exemplo acima, ele está instalado. Caso contrário basta acessar [Node.org](https://nodejs.org/en/) para realizar a instalação.

- Para verificar se você tem a `Vue Cli` instalada execute o comando `'vue --version'` como a seguir:

```
> vue --version
@vue/cli 4.5.13
```

Caso a versão seja impressa na tela, como no exemplo acima, ela está instalada. Caso contrário para realizar sua instalação basta executar um dos comandos a seguir de acordo com gerenciador de pacotes desejado:

`npm`
```
> npm install -g @vue/cli
```

`yarn`
```
> yarn global add @vue/cli
```

## Como rodar

para rodar o sistema em desenvolvimento siga as instruções a seguir.

### Backend

- acesse o diretório do backend (`./backend`) e execute um dos comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`
```
> cd ./backend
> npm install
> npm run dev
```

`yarn`
```
> cd ./backend
> yarn
> yarn dev
```

Pronto, agora a api está rodando no endereço [localhost:3333](http://localhost:3333/)


#

### Frontend

- acesse o diretório do frontend (`./frontend`) e execute um dos comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`
```
> cd ./frontend
> npm install
> npm run serve
```

`yarn`
```
> cd ./frontend
> yarn
> yarn serve
```

Pronto, agora o sistema está rodando no endereço [localhost:8080](http://localhost:8080/)

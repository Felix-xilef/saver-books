# **SaverBooks**

Feito com:

<div
  style="display: flex; justify-content: space-evenly; margin-bottom: 20px;"
>
  <a
    href="https://nodejs.org/"
  >
    <img
      height="64"
      src="https://nodejs.org/static/images/logo.svg"
    ></img>
  </a>
  <a
    href="https://typeorm.io/"
  >
    <img
      style="background-color: rgba(255, 255, 255); border-radius: 5px;"
      height="64"
      src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png"
    ></img>
  </a>
  <a
    href="https://v3.vuejs.org/"
    style="display: flex; align-items: center; text-decoration: none; color: inherit;"
  >
    <img
      height="64"
      src="https://v3.vuejs.org/logo.png"
    ></img>
    <p
      style="margin: 0; margin-left: 6px; font-size: 20pt;"
    >Vue.js</p>
  </a>
</div>

#

## **Requisitos**

Para rodar o projeto é necessário ter o `Node.js` e a `Vue Cli` instalados:

- Para verificar se você tem o `Node.js` instalado execute o comando `'node --version'` como a seguir:

```bash
> node --version
v14.17.1
```

Caso a versão seja impressa na tela, como no exemplo acima, ele está instalado. Caso contrário basta acessar [Node.org](https://nodejs.org/en/) para realizar a instalação.

- Para verificar se você tem a `Vue Cli` instalada execute o comando `'vue --version'` como a seguir:

```bash
> vue --version
@vue/cli 4.5.13
```

Caso a versão seja impressa na tela, como no exemplo acima, ela está instalada. Caso contrário para realizar sua instalação basta executar um dos comandos a seguir de acordo com o gerenciador de pacotes desejado:

`npm`

```bash
> npm install -g @vue/cli
```

`yarn`

```bash
> yarn global add @vue/cli
```

#

## **Backend**

<br/>

### **Instalação**

- acesse o diretório do backend (`./backend`)
- faça uma cópia do arquivo `.env.example` com o nome `.env` e modifique as variáveis de ambiente
- execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência para instalar as dependencias do projeto:

`npm`

```bash
> cd ./backend
> npm install
```

`yarn`

```bash
> cd ./backend
> yarn
```

<br/>

### **Migrations**

Para rodar as migrations basta executar os comando a seguir de acordo com o gerenciador de pacotes desejado após a instalação das dependências:

`npm`

```bash
> npm run migration:run
```

`yarn`

```bash
> yarn migration:run
```

<br/>

### **Executar em desenvolvimento**

Para rodar a `API` em desenvolvimento execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`

```bash
> npm run dev
```

`yarn`

```bash
> yarn dev
```

> Pronto, agora a api está rodando no endereço [localhost:3333](http://localhost:3333/)
>
> **\* Obs:** Ao executar a API em desenvolvimento o Hot Reload é ativado por padrão

<br/>

### **Executar build de produção**

Para compilar os arquivos e rodar a `API` com uma build otimizada para ambiente de produção execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`

```bash
> npm run prod
```

`yarn`

```bash
> yarn prod
```

> Pronto, agora a api está rodando no endereço [localhost:3333](http://localhost:3333/)

#

## **Frontend**

<br/>

### **Instalação**

- acesse o diretório do frontend (`./frontend`)
- faça uma cópia do arquivo `.env.example` com o nome `.env` e modifique as variáveis de ambiente
- execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência para instalar as dependencias do projeto:

`npm`

```bash
> cd ./frontend
> npm install
```

`yarn`

```bash
> cd ./frontend
> yarn
```

<br/>

### **Executar em desenvolvimento**

Para rodar o `Frontend` em desenvolvimento execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`

```bash
> npm run serve
```

`yarn`

```bash
> yarn serve
```

> Pronto, agora o frontend está rodando no endereço [localhost:8080](http://localhost:8080/)
>
> **\* Obs:** Ao executar o Frontend em desenvolvimento o Hot Reload é ativado por padrão

#

## **Frontend - Interface Remota**

<br/>

### **Instalação**

- acesse o diretório do frontend - interface remota (`./frontend-remote`)
- faça uma cópia do arquivo `.env.example` com o nome `.env` e modifique as variáveis de ambiente
- execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência para instalar as dependencias do projeto:

`npm`

```bash
> cd ./frontend-remote
> npm install
```

`yarn`

```bash
> cd ./frontend-remote
> yarn
```

<br/>

### **Executar em desenvolvimento**

Para rodar o `Frontend - Interface Remota` em desenvolvimento execute os comandos a seguir de acordo com o gerenciador de pacotes de sua preferência:

`npm`

```bash
> npm run serve --port=8070
```

`yarn`

```bash
> yarn serve --port=8070
```

> Pronto, agora o frontend - interface remota está rodando no endereço [localhost:8070](http://localhost:8070/)
>
> **\* Obs:** Ao executar o Frontend - Interface Remota em desenvolvimento o Hot Reload é ativado por padrão

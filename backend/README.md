# **Backend**

## **Instalação**

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

#

## **Migrations**

Para rodar as migrations basta executar os comando a seguir de acordo com o gerenciador de pacotes desejado após a instalação das dependências:

`npm`

```bash
> npm run migration:run
```

`yarn`

```bash
> yarn migration:run
```

#

## **Executar em desenvolvimento**

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

#

## **Executar build de produção**

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

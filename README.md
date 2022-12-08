# TypeFlix

Repositório feito em NestJs com catálogo de filmes gerados
randomicamente para uma API.

Tecnologias

- NestJs/NodeJs (4 anos)
- TypeOrm (Ja comecei a aplicar em uma empresa mas trocaram)
- Postgres (Db relacional 4 anos)
- Redis
- Docker (Compose e Dockerfile)
- Swagger
- Jwt
- AWS EC2 _http://44.211.133.222:3000/api_

# Start da Aplicação

## Antes de tudo vamos criar um .env na raíz do projeto

_existe um .env.example na raíz do projeto com portas caso você não queira ficar verificando as portas disponíveis na sua máquina daí é só copiar e colar :)_

```
PORT=
NODE_ENV=

DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PREFIX=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

Primeiramente é necessário rodar o comando na raiz do projeto

```
npm install
```

Depois, com o Docker instalado na máquina podemos rodar o comando a seguir
para inicializar o redis e o Postgres

```
docker-compose up
```

Depois que todo o ambiente estiver instalado e as instâncias
do docker estiverem rodando, vamos popular o banco de dados.

Eu sei da existência das seeders mas preferi usar um commander do
NestJs pois gosto BASTANTE do framework e aprendo até nos testes

```
npm run create:movies
```

Agora é somente startar o projeto, criar um usuário e show!

URL do swagger:

```
localhost:3000/api
```

Para começar a usar a API

- Criar usuário
  - POST /user
- Login
  - POST /login
    - BEARER _seu token_

Features a implementar ou negociar:

- Testes
  - Tenho repositório de testes em NodeJs/NestJs utilizando Jest
    - Links:
      - https://github.com/XamuAvila/TestsTS
      - https://github.com/XamuAvila/tvTracker/blob/main/src/tests/users.test.ts

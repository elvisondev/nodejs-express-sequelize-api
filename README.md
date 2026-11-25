# API de Cursos

API REST desenvolvida com Node.js, Express e Sequelize para gerenciar pessoas, categorias, cursos e matrículas. O projeto utiliza SQLite no ambiente de desenvolvimento e organiza o código em rotas, controladores, serviços e modelos.

> **Status:** em desenvolvimento.

## Objetivos do projeto

- Praticar a construção de uma API REST com Express.
- Modelar entidades e relacionamentos com Sequelize.
- Implementar operações de gerenciamento de pessoas, categorias e cursos.
- Registrar matrículas de estudantes e consultar as matrículas de uma pessoa.
- Utilizar migrations e seeders para estruturar e popular o banco de dados.

## Tecnologias e dependências

### Aplicação

- **Node.js** — execução da aplicação.
- **Express 5** — criação do servidor HTTP e definição das rotas.
- **Sequelize 6** — ORM e mapeamento das entidades.
- **SQLite 3** — banco de dados configurado para desenvolvimento.
- **sequelize-cli** — execução de migrations e seeders.

### Desenvolvimento

- **ESLint** e **@eslint/js** — análise estática do código.
- **globals** — definição de variáveis globais do ambiente Node.js para o ESLint.

## Estrutura do projeto

```text
.
├── arquivos-base/
│   ├── entidades.png
│   ├── requisitos.md
│   └── seeder*.js
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── database/
│       ├── config/
│       ├── migrations/
│       ├── models/
│       ├── queries/
│       ├── seeders/
│       └── storage/
├── .sequelizerc
├── eslint.config.mjs
└── package.json
```

- **`arquivos-base/`** — diagrama de entidades, requisitos do projeto e arquivos de dados de referência.
- **`src/app.js`** — configura a aplicação Express e registra as rotas.
- **`src/server.js`** — inicia o servidor na porta definida pela variável de ambiente `PORT`.
- **`src/routes/`** — declara os endpoints e encaminha as requisições aos controladores.
- **`src/controllers/`** — trata requisições e respostas HTTP.
- **`src/services/`** — concentra operações realizadas sobre os modelos.
- **`src/database/config/`** — configurações do Sequelize por ambiente.
- **`src/database/migrations/`** — criação e alteração da estrutura das tabelas.
- **`src/database/models/`** — modelos Sequelize e associações entre entidades.
- **`src/database/seeders/`** — dados iniciais para pessoas, categorias, cursos e matrículas.
- **`src/database/queries/`** — consultas SQL; atualmente contém uma consulta de listagem de cursos.
- **`src/database/storage/`** — arquivo SQLite utilizado na configuração de desenvolvimento.
- **`src/utils/`** — constantes de status HTTP.
- **`.sequelizerc`** — informa ao Sequelize CLI os caminhos de configuração, modelos, migrations e seeders.
- **`package.json`** — dependências e comandos npm do projeto.

## Funcionalidades implementadas

- Operações de criação, listagem, consulta por identificador, atualização e exclusão de pessoas, categorias e cursos.
- Criação de matrícula associada a um estudante.
- Consulta das matrículas associadas a um estudante.
- Relacionamentos entre pessoas, cursos, categorias e matrículas definidos nos modelos Sequelize.
- Migrations e seeders para as entidades do projeto.

Os requisitos adicionais descritos em `arquivos-base/requisitos.md` estão marcados como pendentes no arquivo.

## Pré-requisitos

- Node.js em uma versão compatível com a opção `--env-file-if-exists`, utilizada pelo comando de desenvolvimento.
- npm.

## Instalação e configuração

1. Instale as dependências na raiz do projeto:

   ```bash
   npm install
   ```

2. Defina a variável de ambiente `PORT`, usada pelo servidor. O comando de desenvolvimento carrega o arquivo `.env` caso ele exista. Por exemplo, crie esse arquivo na raiz com:

   ```env
   PORT=3000
   ```

   O valor `3000` é apenas um exemplo; use uma porta disponível no seu ambiente.

O ambiente `development` está configurado para usar SQLite no arquivo `src/database/storage/db.sqlite`.

## Migrations e seeders

O projeto contém migrations e seeders configurados pelo `.sequelizerc`. Execute os comandos na raiz do repositório, nesta ordem:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

O primeiro comando aplica as migrations pendentes; o segundo executa todos os seeders disponíveis.

## Execução

Com a variável `PORT` configurada, inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Para iniciar com reinicialização automática ao detectar alterações:

```bash
npm run dev:watch
```

O servidor fica disponível em `http://localhost:<PORT>`, usando o valor definido na variável de ambiente. Com o valor de exemplo acima, o endereço será `http://localhost:3000`.

## Endpoints da API

Todas as rotas recebem e respondem dados em JSON. Os endpoints não possuem prefixo global.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/pessoas` | Lista pessoas. |
| `GET` | `/pessoas/:id` | Consulta uma pessoa pelo identificador. |
| `POST` | `/pessoas` | Cria uma pessoa. |
| `PUT` | `/pessoas/:id` | Atualiza uma pessoa. |
| `DELETE` | `/pessoas/:id` | Exclui uma pessoa. |
| `GET` | `/pessoas/:estudanteId/matriculas` | Lista as matrículas associadas à pessoa indicada como estudante. |
| `POST` | `/pessoas/:estudanteId/matriculas` | Cria uma matrícula para o estudante indicado. |
| `GET` | `/categorias` | Lista categorias. |
| `GET` | `/categorias/:id` | Consulta uma categoria pelo identificador. |
| `POST` | `/categorias` | Cria uma categoria. |
| `PUT` | `/categorias/:id` | Atualiza uma categoria. |
| `DELETE` | `/categorias/:id` | Exclui uma categoria. |
| `GET` | `/cursos` | Lista cursos. |
| `GET` | `/cursos/:id` | Consulta um curso pelo identificador. |
| `POST` | `/cursos` | Cria um curso. |
| `PUT` | `/cursos/:id` | Atualiza um curso. |
| `DELETE` | `/cursos/:id` | Exclui um curso. |

## Status do projeto

**Em desenvolvimento.** A API contém operações CRUD para pessoas, categorias e cursos, além de operações de matrícula por estudante. Os requisitos adicionais listados em `arquivos-base/requisitos.md` ainda estão pendentes.

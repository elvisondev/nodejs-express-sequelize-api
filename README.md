# API de Cursos

API REST em Node.js, Express e Sequelize para gerenciar pessoas, categorias, cursos e matrículas. O ambiente de desenvolvimento utiliza SQLite.

## Pré-requisitos

- Node.js 20.9 ou superior
- npm

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com a porta da aplicação:

```env
PORT=3000
```

O ambiente `development` usa o banco SQLite localizado em `src/database/storage/db.sqlite`.

Crie ou atualize as tabelas e carregue os dados iniciais:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Os seeders criam seis pessoas, quatro categorias, quatro cursos e quatro matrículas de exemplo.

Para desfazer as alterações realizadas pelos comandos anteriores:

```bash
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:seed:undo:all
```

## Executando a API

Modo padrão:

```bash
npm run dev
```

Modo com reinicialização automática:

```bash
npm run dev:watch
```

Executar o ESLint:

```bash
npm run lint
```

Com `PORT=3000`, a API fica disponível em `http://localhost:3000`.

## Estrutura do projeto

```text
src/
├── app.js                 # configuração do Express
├── server.js              # inicialização do servidor
├── controllers/           # tratamento das requisições
├── routes/                # definição dos endpoints
├── services/              # acesso aos modelos Sequelize
├── utils/                 # CPF e códigos HTTP
└── database/
    ├── config/            # conexão por ambiente
    ├── migrations/        # estrutura das tabelas
    ├── models/            # entidades e associações
    ├── seeders/           # dados iniciais
    ├── queries/           # consultas SQL auxiliares
    └── storage/db.sqlite  # banco de desenvolvimento
```

## Tabela de endpoints

Todas as rotas recebem e respondem dados em JSON. A API não possui prefixo global nas rotas.

Os requisitos pendentes e implementados do projeto estão registrados em `arquivos-base/requisitos.md`.

### Pessoas

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/pessoas` | Lista pessoas ativas |
| `GET` | `/pessoas/todos` | Lista todas as pessoas pelo escopo `registros` |
| `GET` | `/pessoas/roles?role=estudante` | Lista pessoas com o cargo `estudante` |
| `GET` | `/pessoas/roles?role=docente` | Lista pessoas com o cargo `docente` |
| `GET` | `/pessoas/:id` | Busca uma pessoa pelo ID |
| `POST` | `/pessoas` | Cria uma pessoa |
| `PUT` | `/pessoas/:id` | Atualiza uma pessoa |
| `DELETE` | `/pessoas/:id` | Exclui uma pessoa por soft delete |
| `GET` | `/pessoas/:estudanteId/matriculas` | Lista as matrículas de uma pessoa |
| `POST` | `/pessoas/:estudanteId/matriculas` | Cria uma matrícula |

### Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/categorias` | Lista categorias |
| `GET` | `/categorias/:id` | Busca uma categoria pelo ID |
| `POST` | `/categorias` | Cria uma categoria |
| `PUT` | `/categorias/:id` | Atualiza uma categoria |
| `DELETE` | `/categorias/:id` | Exclui uma categoria por soft delete |

### Cursos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/cursos` | Lista cursos |
| `GET` | `/cursos/:id` | Busca um curso pelo ID |
| `POST` | `/cursos` | Cria um curso |
| `PUT` | `/cursos/:id` | Atualiza um curso |
| `DELETE` | `/cursos/:id` | Exclui um curso por soft delete |

## Requisições no Postman ou Insomnia

### Pessoas

#### Listar apenas pessoas ativas

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas`
- **Parâmetros:** nenhum
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "nome": "Solange Estudante",
    "email": "solange@email.com",
    "cpf": "63058133022",
    "ativo": true,
    "role": "estudante"
  },
  {
    "id": 5,
    "nome": "Ricardo Docente",
    "email": "ricardo@email.com",
    "cpf": "06946507061",
    "ativo": true,
    "role": "docente"
  }
]
```

#### Listar todas as pessoas

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas/todos`
- **Parâmetros:** nenhum
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "nome": "Solange Estudante",
    "email": "solange@email.com",
    "cpf": "63058133022",
    "ativo": false,
    "role": "estudante"
  },
  {
    "id": 5,
    "nome": "Ricardo Docente",
    "email": "ricardo@email.com",
    "cpf": "06946507061",
    "ativo": true,
    "role": "docente"
  }
]
```

#### Filtrar pessoas pelo cargo de estudante

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas/roles?role=estudante`
- **Parâmetro de query:** `role=estudante`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "nome": "Solange Estudante",
    "email": "solange@email.com",
    "cpf": "63058133022",
    "ativo": true,
    "role": "estudante"
  },
  {
    "id": 2,
    "nome": "Igor Estudante",
    "email": "igor@email.com",
    "cpf": "99018205028",
    "ativo": true,
    "role": "estudante"
  }
]
```

#### Filtrar pessoas pelo cargo de docente

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas/roles?role=docente`
- **Parâmetro de query:** `role=docente`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 5,
    "nome": "Ricardo Docente",
    "email": "ricardo@email.com",
    "cpf": "06946507061",
    "ativo": true,
    "role": "docente"
  },
  {
    "id": 6,
    "nome": "Dine Docente",
    "email": "dine@email.com",
    "cpf": "80941142078",
    "ativo": true,
    "role": "docente"
  }
]
```

Um cargo diferente de `estudante` ou `docente` retorna `400 Bad Request`:

```json
{
  "message": "Cargo não encontrado"
}
```

#### Buscar pessoa por ID

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
{
  "id": 1,
  "nome": "Solange Estudante",
  "email": "solange@email.com",
  "cpf": "63058133022",
  "ativo": true,
  "role": "estudante"
}
```

ID inexistente ou pertencente a pessoa inativa:

- **Status:** `404 Not Found`

```json
{
  "message": "Id não encontrado"
}
```

#### Criar pessoa

- **Método:** `POST`
- **URL completa:** `http://localhost:3000/pessoas`
- **Parâmetros:** nenhum
- **Body:**

```json
{
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "cpf": "63058133022",
  "ativo": true,
  "role": "estudante"
}
```

- **Status esperado:** `201 Created`

Resposta de exemplo:

```json
{
  "message": "Novo usuário criado com sucesso",
  "data": {
    "id": 7,
    "nome": "Ana Silva",
    "email": "ana@email.com",
    "cpf": "63058133022",
    "ativo": true,
    "role": "estudante"
  }
}
```

O nome deve ter entre 3 e 150 caracteres, o e-mail deve ser válido e o CPF precisa ter exatamente 11 caracteres. A validação atual do CPF verifica apenas o comprimento.

#### Atualizar pessoa

- **Método:** `PUT`
- **URL completa:** `http://localhost:3000/pessoas/1`
- **Parâmetro de rota:** `id=1`
- **Body:**

```json
{
  "nome": "Solange Atualizada",
  "ativo": true
}
```

- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "Atualizado com sucesso"
}
```

Se o ID não existir:

- **Status:** `404 Not Found`

```json
{
  "message": "Registro não encontrado para atualização"
}
```

#### Excluir pessoa

- **Método:** `DELETE`
- **URL completa:** `http://localhost:3000/pessoas/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "User deletado com suscesso"
}
```

Se o ID não existir:

- **Status:** `404 Not Found`

```json
{
  "message": "User não encontrado para exclusão"
}
```

#### Listar matrículas de uma pessoa

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/pessoas/1/matriculas`
- **Parâmetro de rota:** `estudanteId=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "status": "matriculado",
    "estudante_id": 1,
    "curso_id": 1
  }
]
```

Se a pessoa não existir:

- **Status:** `404 Not Found`

```json
{
  "message": "Estundante não encontrado na base de dados"
}
```

#### Criar matrícula

- **Método:** `POST`
- **URL completa:** `http://localhost:3000/pessoas/1/matriculas`
- **Parâmetro de rota:** `estudanteId=1`
- **Body:**

```json
{
  "estudante_id": 1,
  "curso_id": 1,
  "status": "matriculado"
}
```

- **Status esperado:** `201 Created`

Resposta:

```json
{
  "message": "Novo usuário criado com sucesso",
  "data": {
    "id": 5,
    "estudante_id": 1,
    "curso_id": 1,
    "status": "matriculado"
  }
}
```

Na criação da matrícula, o `estudante_id` vem do body da requisição. A implementação não verifica se ele corresponde ao `estudanteId` informado na URL.

### Categorias

#### Listar categorias

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/categorias`
- **Parâmetros:** nenhum
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "titulo": "Node.js"
  },
  {
    "id": 2,
    "titulo": "Java"
  }
]
```

#### Buscar categoria por ID

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/categorias/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta:

```json
{
  "id": 1,
  "titulo": "Node.js"
}
```

Se o ID não existir:

- **Status:** `404 Not Found`

```json
{
  "message": "Id não encontrado"
}
```

#### Criar categoria

- **Método:** `POST`
- **URL completa:** `http://localhost:3000/categorias`
- **Parâmetros:** nenhum
- **Body:**

```json
{
  "titulo": "JavaScript"
}
```

- **Status esperado:** `201 Created`

Resposta:

```json
{
  "message": "Novo usuário criado com sucesso",
  "data": {
    "id": 5,
    "titulo": "JavaScript"
  }
}
```

#### Atualizar categoria

- **Método:** `PUT`
- **URL completa:** `http://localhost:3000/categorias/1`
- **Parâmetro de rota:** `id=1`
- **Body:**

```json
{
  "titulo": "Node.js Avançado"
}
```

- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "Atualizado com sucesso"
}
```

#### Excluir categoria

- **Método:** `DELETE`
- **URL completa:** `http://localhost:3000/categorias/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "User deletado com suscesso"
}
```

### Cursos

#### Listar cursos

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/cursos`
- **Parâmetros:** nenhum
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta de exemplo:

```json
[
  {
    "id": 1,
    "titulo": "API com Express",
    "descricao": "Curso de API com Express e MongoDB",
    "data_inicio": "2023-01-01",
    "categoria_id": 1,
    "docente_id": 5
  },
  {
    "id": 2,
    "titulo": "SpringBoot",
    "descricao": "Curso de Java com Spring Framework",
    "data_inicio": "2023-01-01",
    "categoria_id": 2,
    "docente_id": 5
  }
]
```

#### Buscar curso por ID

- **Método:** `GET`
- **URL completa:** `http://localhost:3000/cursos/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta:

```json
{
  "id": 1,
  "titulo": "API com Express",
  "descricao": "Curso de API com Express e MongoDB",
  "data_inicio": "2023-01-01",
  "categoria_id": 1,
  "docente_id": 5
}
```

Se o ID não existir:

- **Status:** `404 Not Found`

```json
{
  "message": "Id não encontrado"
}
```

#### Criar curso

- **Método:** `POST`
- **URL completa:** `http://localhost:3000/cursos`
- **Parâmetros:** nenhum
- **Body:**

```json
{
  "titulo": "API com Express",
  "descricao": "Desenvolvimento de APIs REST",
  "data_inicio": "2026-12-01",
  "categoria_id": 1,
  "docente_id": 5
}
```

- **Status esperado:** `201 Created`

Resposta:

```json
{
  "message": "Novo usuário criado com sucesso",
  "data": {
    "id": 5,
    "titulo": "API com Express",
    "descricao": "Desenvolvimento de APIs REST",
    "data_inicio": "2026-12-01",
    "categoria_id": 1,
    "docente_id": 5
  }
}
```

#### Atualizar curso

- **Método:** `PUT`
- **URL completa:** `http://localhost:3000/cursos/1`
- **Parâmetro de rota:** `id=1`
- **Body:**

```json
{
  "titulo": "API REST com Express",
  "descricao": "Desenvolvimento de APIs REST com Node.js"
}
```

- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "Atualizado com sucesso"
}
```

#### Excluir curso

- **Método:** `DELETE`
- **URL completa:** `http://localhost:3000/cursos/1`
- **Parâmetro de rota:** `id=1`
- **Body:** não utilizado
- **Status esperado:** `200 OK`

Resposta:

```json
{
  "message": "User deletado com suscesso"
}
```

## Respostas de erro comuns

- `400 Bad Request`: filtro inválido em `/pessoas/roles`.
- `404 Not Found`: pessoa, categoria ou curso não encontrado.
- `500 Internal Server Error`: falha interna ou erro lançado pelo Sequelize durante uma operação.

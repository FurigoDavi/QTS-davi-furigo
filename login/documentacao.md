# Resumo do Código

Este código cria uma **API REST** usando **Node.js**, **Express** e **MySQL** para fazer um CRUD de funcionários.

---

# Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Cors

---

# O que o código faz

A API permite:

- Listar funcionários
- Cadastrar funcionários
- Atualizar funcionários
- Excluir funcionários

Isso é chamado de CRUD:

| Operação | Significado |
|---|---|
| Create | Criar |
| Read | Ler/Listar |
| Update | Atualizar |
| Delete | Deletar |

---

# Estrutura do Código

## 1. Importação das bibliotecas

```js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
```

### Função:
- `express` → cria o servidor
- `mysql2` → conecta ao MySQL
- `cors` → permite conexão com frontend

---

## 2. Criação do servidor

```js
const app = express();
```

Inicializa o Express.

---

## 3. Middlewares

```js
app.use(cors());
app.use(express.json());
```

### Função:
- `cors()` → libera acesso externo
- `express.json()` → permite receber JSON

---

## 4. Configuração do banco

```js
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_funcionarios'
};
```

Define os dados da conexão com o MySQL.

---

## 5. Criação da conexão

```js
const db = mysql.createPool(dbConfig);
```

Cria um pool de conexões com o banco de dados.

---

# Rotas da API

## GET

```js
app.get('/api/funcionarios')
```

Lista todos os funcionários.

### SQL:

```sql
SELECT * FROM funcionarios ORDER BY id DESC
```

---

## POST

```js
app.post('/api/funcionarios')
```

Cadastra um novo funcionário.

### SQL:

```sql
INSERT INTO funcionarios (nome, funcao, salario)
VALUES (?, ?, ?)
```

---

## PUT

```js
app.put('/api/funcionarios/:id')
```

Atualiza um funcionário existente.

### SQL:

```sql
UPDATE funcionarios
SET nome=?, funcao=?, salario=?
WHERE id=?
```

---

## DELETE

```js
app.delete('/api/funcionarios/:id')
```

Remove um funcionário.

### SQL:

```sql
DELETE FROM funcionarios WHERE id = ?
```

---

# Inicialização do servidor

```js
app.listen(PORT)
```

Liga o servidor na porta 3000.

---

# Endpoints Disponíveis

| Método | Endpoint | Função |
|---|---|---|
| GET | /api/funcionarios | Listar |
| POST | /api/funcionarios | Cadastrar |
| PUT | /api/funcionarios/:id | Atualizar |
| DELETE | /api/funcionarios/:id | Excluir |

---

# Resultado Final

O código cria um backend completo que:

- recebe requisições HTTP
- acessa o banco MySQL
- retorna dados em JSON
- permite integração com frontend ou Postman
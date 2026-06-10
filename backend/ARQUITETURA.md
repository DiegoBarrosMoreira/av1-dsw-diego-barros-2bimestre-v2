# Guia Detalhado da Arquitetura MVC

## 📚 Introdução

Este documento explica em detalhes como funciona a arquitetura MVC implementada neste projeto.

## 🏗️ Visão Geral

### O Padrão MVC

MVC divide a aplicação em 3 componentes principais:

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │ HTTP Request
       ↓
┌─────────────────────────────────────┐
│           APLICAÇÃO                 │
│                                     │
│  ┌────────┐    ┌────────────┐     │
│  │ ROUTES │───→│ CONTROLLER │     │
│  └────────┘    └──────┬─────┘     │
│                       │             │
│                       ↓             │
│                 ┌──────────┐       │
│                 │  MODEL   │       │
│                 └──────────┘       │
│                       │             │
│                       ↓             │
│                 ┌──────────┐       │
│                 │   VIEW   │       │
│                 │  (JSON)  │       │
│                 └──────────┘       │
└─────────────────────────────────────┘
       │
       ↓ HTTP Response (JSON)
┌──────────────┐
│   Cliente    │
└──────────────┘
```

## 📂 Estrutura de Arquivos

### 1. Models (`src/models/`)

**Responsabilidade:** Gerenciar dados e lógica de negócio

**O que faz:**

- Armazena dados (em memória, banco de dados, etc.)
- Define a estrutura dos dados
- Implementa regras de negócio
- Realiza operações CRUD

**Exemplo: `tarefaModel.js`**

```javascript
// Define o armazenamento
const tarefas = [];

// Implementa a lógica de negócio
export function criarNovaTarefa(descricao) {
  const novaTarefa = {
    id: gerarNovoId(),
    descricao: descricao.trim(),
    concluida: false
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}
```

**Características:**

- ✅ Não conhece HTTP (req, res)
- ✅ Pode ser testado isoladamente
- ✅ Reutilizável em diferentes contextos
- ✅ Focado apenas nos dados

### 2. Controllers (`src/controllers/`)

**Responsabilidade:** Processar requisições e coordenar Model e View

**O que faz:**

- Recebe requisições HTTP
- Valida dados de entrada
- Chama métodos do Model
- Formata e envia respostas
- Gerencia códigos de status HTTP

**Exemplo: `tarefaController.js`**

```javascript
export function criarTarefa(req, res) {
  // 1. Recebe dados da requisição
  const { descricao } = req.body;

  // 2. Valida os dados
  if (typeof descricao !== "string" || descricao.trim() === "") {
    return res.status(400).json({ erro: "Descrição é obrigatória" });
  }

  // 3. Chama o Model
  const tarefaCriada = TarefaModel.criarNovaTarefa(descricao);

  // 4. Retorna a resposta
  res.status(201).json({
    mensagem: "Tarefa criada com sucesso!",
    tarefa: tarefaCriada
  });
}
```

**Características:**

- ✅ Conhece HTTP (req, res)
- ✅ Faz a ponte entre Routes e Model
- ✅ Valida entrada do usuário
- ✅ Define respostas e status codes

### 3. Routes (`src/routes/`)

**Responsabilidade:** Definir URLs e mapear para controllers

**O que faz:**

- Define endpoints da API
- Mapeia verbos HTTP (GET, POST, etc.)
- Conecta URLs aos controllers
- Organiza rotas por recurso

**Exemplo: `tarefaRoutes.js`**

```javascript
import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

// Define as rotas e seus controllers
router.get("/tarefas", TarefaController.listarTarefas);
router.post("/tarefas", TarefaController.criarTarefa);
router.get("/tarefas/:id", TarefaController.obterTarefa);
router.patch("/tarefas/:id", TarefaController.atualizarTarefa);
router.delete("/tarefas/:id", TarefaController.excluirTarefa);

export default router;
```

**Características:**

- ✅ Declarativo e fácil de ler
- ✅ Centraliza definição de rotas
- ✅ Facilita documentação da API
- ✅ Permite modularização por recurso

### 4. Views (`src/views/`)

**No contexto de API REST:**

- É a representação JSON dos dados
- Definida implicitamente no Controller
- Preparada para frontend futuro

**Quando houver frontend:**

```javascript
// Com template engine (EJS, Handlebars)
res.render("tarefas", { tarefas: listaTarefas });

// Ou servir SPA (React, Vue)
app.use(express.static("views/public"));
```

### 5. App (`src/app.js`)

**Responsabilidade:** Configurar a aplicação Express

**O que faz:**

- Cria instância do Express
- Registra middlewares
- Importa e registra rotas
- Configura tratamento de erros
- Exporta app configurado

**Características:**

- ✅ Separado do server.js
- ✅ Permite testar sem iniciar servidor
- ✅ Configuração centralizada
- ✅ Fácil de estender

### 6. Server (`src/server.js`)

**Responsabilidade:** Iniciar o servidor

**O que faz:**

- Importa o app configurado
- Define a porta
- Inicia o servidor HTTP
- Exibe mensagens de status

**Características:**

- ✅ Mínimo e simples
- ✅ Separado da configuração
- ✅ Ponto de entrada da aplicação

## 🔄 Fluxo Completo de uma Requisição

### Exemplo: Criar uma nova tarefa

```
1. Cliente envia requisição:
   POST http://localhost:3000/tarefas
   Body: { "descricao": "Estudar MVC" }

   ↓

2. Express recebe e processa middlewares:
   - express.json() converte body para objeto

   ↓

3. Routes identifica a rota:
   - POST /tarefas → TarefaController.criarTarefa

   ↓

4. Controller recebe a requisição:
   - Extrai a descrição do body
   - Valida se descrição é válida

   ↓

5. Controller chama o Model:
   - TarefaModel.criarNovaTarefa(descricao)

   ↓

6. Model processa:
   - Gera novo ID
   - Cria objeto da tarefa
   - Adiciona ao array
   - Retorna a tarefa criada

   ↓

7. Controller recebe o resultado:
   - Formata a resposta
   - Define status 201 (Created)

   ↓

8. Cliente recebe a resposta:
   {
     "mensagem": "Tarefa criada com sucesso!",
     "tarefa": {
       "id": 3,
       "descricao": "Estudar MVC",
       "concluida": false
     }
   }
```

## 🎯 Vantagens desta Arquitetura

### 1. Separação de Responsabilidades

Cada camada tem uma função clara e específica.

### 2. Manutenibilidade

- Fácil localizar onde fazer mudanças
- Código organizado e previsível
- Menos acoplamento entre componentes

### 3. Testabilidade

```javascript
// Testar Model sem HTTP
const tarefa = criarNovaTarefa("Teste");
assert(tarefa.descricao === "Teste");

// Testar Controller com mocks
const req = { body: { descricao: "Teste" } };
const res = { status: jest.fn(), json: jest.fn() };
criarTarefa(req, res);
```

### 4. Escalabilidade

Adicionar novos recursos é mais fácil:

```
src/
├── models/
│   ├── tarefaModel.js
│   └── usuarioModel.js       ← Novo recurso
├── controllers/
│   ├── tarefaController.js
│   └── usuarioController.js  ← Novo recurso
└── routes/
    ├── tarefaRoutes.js
    └── usuarioRoutes.js      ← Novo recurso
```

### 5. Reutilização

O mesmo Model pode ser usado por:

- API REST
- GraphQL
- WebSockets
- CLI (linha de comando)

## 🚀 Próximos Passos

### Adicionar Camadas Extras

```
src/
├── models/          # Dados e lógica de negócio
├── controllers/     # Processamento de requisições
├── routes/          # Definição de endpoints
├── views/           # Apresentação (futuro)
├── services/        # Lógica de negócio complexa
├── middlewares/     # Middlewares customizados
├── validators/      # Validação de dados
├── utils/           # Funções utilitárias
└── config/          # Configurações
```

### Services Layer

Para lógica de negócio mais complexa:

```javascript
// services/tarefaService.js
export function processarTarefas(tarefas) {
  // Lógica complexa aqui
  return tarefas.filter((t) => !t.concluida);
}

// Controller usa o Service
const todasTarefas = TarefaModel.obterTodasTarefas();
const tarefasPendentes = TarefaService.processarTarefas(todasTarefas);
```

### Validators Layer

Para validações complexas:

```javascript
// validators/tarefaValidator.js
export function validarTarefa(dados) {
  if (!dados.descricao || dados.descricao.length < 3) {
    throw new Error("Descrição deve ter ao menos 3 caracteres");
  }
  return true;
}
```

## 📖 Recursos Adicionais

- [Express.js Documentation](https://expressjs.com/)
- [REST API Best Practices](https://restfulapi.net/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Lembre-se:** MVC é um ponto de partida. Conforme o projeto cresce, outras camadas e padrões podem ser adicionados!

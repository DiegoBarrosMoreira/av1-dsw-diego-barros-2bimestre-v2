# API de Tarefas - Arquitetura MVC

## 📚 Sobre o Projeto

API REST para gerenciamento de tarefas, desenvolvida com **Node.js** e **Express**, seguindo o padrão de arquitetura **MVC (Model-View-Controller)**.

## 🏗️ Arquitetura MVC

### O que é MVC?

MVC é um padrão de arquitetura que separa a aplicação em três camadas principais:

- **Model (Modelo)**: Gerencia os dados e a lógica de negócio
- **View (Visão)**: Apresenta os dados ao usuário (no caso de APIs, são as respostas JSON)
- **Controller (Controlador)**: Processa as requisições e coordena Model e View

### Benefícios

- ✅ **Separação de responsabilidades**: Cada camada tem uma função específica
- ✅ **Manutenibilidade**: Código mais fácil de entender e modificar
- ✅ **Escalabilidade**: Facilita a adição de novos recursos
- ✅ **Testabilidade**: Permite testar cada camada independentemente
- ✅ **Reutilização**: Código pode ser reutilizado em diferentes contextos

## 📂 Estrutura do Projeto

```
api-base-2bimestre/
├── src/
│   ├── models/              # Camada de Dados
│   │   └── tarefaModel.js   # Lógica de negócio das tarefas
│   │
│   ├── controllers/         # Camada de Controle
│   │   └── tarefaController.js  # Processa requisições HTTP
│   │
│   ├── routes/              # Definição de Rotas
│   │   └── tarefaRoutes.js  # Rotas da API
│   │
│   ├── views/               # Camada de Apresentação (para futuro frontend)
│   │   └── README.md
│   │
│   ├── config/              # Configurações (vazio no momento)
│   │
│   ├── app.js               # Configuração do Express
│   ├── server.js            # Inicialização do servidor
│   ├── index.js             # Arquivo de teste (opcional)
│   └── tarefas.js           # Arquivo antigo (pode ser removido)
│
├── package.json
└── README.md
```

## 🔄 Fluxo de uma Requisição

```
Cliente → Rota → Controller → Model → Controller → Resposta JSON (View)
```

**Exemplo prático:**

1. **Cliente** faz uma requisição: `GET /tarefas`
2. **Rota** (`tarefaRoutes.js`) identifica a rota e chama o controller
3. **Controller** (`tarefaController.js`) recebe a requisição
4. **Controller** chama o **Model** (`tarefaModel.js`) para buscar os dados
5. **Model** retorna os dados para o **Controller**
6. **Controller** envia a resposta JSON de volta ao **Cliente**

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Iniciar o Servidor

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Listar todas as tarefas

```http
GET /tarefas
```

### Obter uma tarefa específica

```http
GET /tarefas/:id
```

### Criar uma nova tarefa

```http
POST /tarefas
Content-Type: application/json

{
  "descricao": "Minha nova tarefa"
}
```

### Atualizar uma tarefa

```http
PATCH /tarefas/:id
Content-Type: application/json

{
  "descricao": "Tarefa atualizada",
  "concluida": true
}
```

### Excluir uma tarefa

```http
DELETE /tarefas/:id
```

## 🎯 Detalhes das Camadas

### 📊 Model (`models/tarefaModel.js`)

Responsável por:

- Armazenar dados (em memória, por enquanto)
- Implementar lógica de negócio
- Operações CRUD (Create, Read, Update, Delete)

**Funções principais:**

- `obterTodasTarefas()`
- `obterTarefaPorId(id)`
- `criarNovaTarefa(descricao)`
- `atualizarTarefa(id, descricao, status)`
- `excluirTarefa(id)`

### 🎮 Controller (`controllers/tarefaController.js`)

Responsável por:

- Receber requisições HTTP
- Validar dados de entrada
- Chamar métodos do Model
- Retornar respostas HTTP apropriadas

**Funções principais:**

- `listarTarefas(req, res)`
- `obterTarefa(req, res)`
- `criarTarefa(req, res)`
- `atualizarTarefa(req, res)`
- `excluirTarefa(req, res)`

### 🛣️ Routes (`routes/tarefaRoutes.js`)

Responsável por:

- Definir as rotas da API
- Mapear URLs para controllers
- Organizar endpoints por recurso

### ⚙️ App (`app.js`)

Responsável por:

- Configurar middlewares
- Registrar rotas
- Configurar tratamento de erros
- Exportar a aplicação configurada

### 🖥️ Server (`server.js`)

Responsável por:

- Importar a aplicação
- Iniciar o servidor na porta especificada
- Separar lógica de configuração da inicialização

## 🔮 Próximos Passos

- [ ] Integrar banco de dados (MongoDB, PostgreSQL, etc.)
- [ ] Adicionar autenticação e autorização
- [ ] Implementar validação com bibliotecas (Joi, Yup)
- [ ] Criar testes unitários e de integração
- [ ] Adicionar frontend (React, Vue, etc.)
- [ ] Implementar tratamento de erros centralizado
- [ ] Adicionar paginação nas listagens
- [ ] Documentar API com Swagger

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web minimalista
- **ES Modules**: Uso de `import/export` ao invés de `require`

## 📝 Scripts Disponíveis

```json
{
  "dev": "np src/server.js", // Inicia o servidor em modo desenvolvimento
  "batata": "node src/index.js" // Executa o arquivo de teste
}
```

## ⚠️ Observações

- Os dados estão armazenados **em memória** e serão perdidos quando o servidor reiniciar
- Para persistência de dados, será necessário integrar um banco de dados
- O diretório `views/` está preparado para receber o frontend no futuro

## 📖 Aprendizado

Este projeto é ideal para entender:

- ✅ Como estruturar uma API REST
- ✅ O que é e como aplicar o padrão MVC
- ✅ Separação de responsabilidades
- ✅ Boas práticas de organização de código
- ✅ Como preparar um projeto para crescer

---

Desenvolvido para fins educacionais 🎓

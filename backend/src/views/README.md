# Views - Camada de Apresentação

## 📋 Descrição

Esta pasta está reservada para a **camada de Views** da arquitetura MVC.

## 🎯 Propósito

No contexto de uma aplicação web completa, esta camada será responsável por:

### Para Backend (API REST - atual)

- Estruturação das respostas JSON
- Templates de e-mails (se necessário)
- Documentação da API (Swagger/OpenAPI)

### Para Frontend (futuro)

- Páginas HTML
- Templates (EJS, Handlebars, Pug, etc.)
- Componentes de interface
- Arquivos estáticos (CSS, JavaScript do cliente)

## 🔮 Uso Futuro

Quando você integrar o frontend ao projeto, este diretório pode conter:

```
views/
├── pages/              # Páginas HTML
│   ├── index.html
│   ├── tarefas.html
│   └── sobre.html
├── components/         # Componentes reutilizáveis
│   ├── header.html
│   └── footer.html
├── layouts/            # Layouts base
│   └── main.html
└── assets/             # Recursos estáticos
    ├── css/
    ├── js/
    └── images/
```

## 💡 Alternativas

Se você optar por uma arquitetura de **aplicação separada** (SPA - Single Page Application):

- Frontend: React, Vue, Angular (em projeto separado)
- Backend: API REST (projeto atual)
- Comunicação: JSON via HTTP

Neste caso, este diretório pode não ser necessário, pois o frontend seria um projeto independente.

## 📚 Próximos Passos

Por enquanto, este diretório permanece vazio. Quando for trabalhar com frontend:

1. Decida se vai usar templates do lado do servidor ou SPA
2. Configure o engine de template se necessário (no [app.js](../app.js))
3. Crie suas views seguindo a estrutura escolhida

// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

/**
 * GET /tarefas - Lista todas as tarefas
 */
router.get("/tarefas", TarefaController.listar);

/**
 * GET /tarefas/:id - Obtém uma tarefa específica
 */
router.get("/tarefas/:id", TarefaController.buscarPorId);

/**
 * POST /tarefas - Cria uma nova tarefa
 */
router.post("/tarefas", TarefaController.criar);

/**
 * PUT /tarefas/:id - Atualiza uma tarefa existente
 */
router.put("/tarefas/:id", TarefaController.atualizar);

/**
 * DELETE /tarefas/:id - Remove uma tarefa
 */
router.delete("/tarefas/:id", TarefaController.excluir);

export default router;

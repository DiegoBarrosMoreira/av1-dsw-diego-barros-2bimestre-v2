// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas em formato JSON
 * @route GET /tarefas
 */
export function listarTarefas(req, res) {
  const tarefas = TarefaModel.obterTodasTarefas();
  res.json(tarefas);
}

/**
 * Retorna uma tarefa específica com base no id enviado na URL
 * @route GET /tarefas/:id
 */
export function obterTarefa(req, res) {
  // Converte o id recebido pela URL para número
  const idNumero = Number(req.params.id);

  // Valida se o id é realmente um número
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  // Busca a tarefa pelo id no Model
  const tarefa = TarefaModel.obterTarefaPorId(idNumero);

  // Se não encontrar, retorna erro 404
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Se encontrar, retorna a tarefa
  res.json(tarefa);
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export function criarTarefa(req, res) {
  // Pega a descrição enviada no corpo da requisição
  const { descricao } = req.body;

  // Valida se a descrição foi enviada corretamente
  if (typeof descricao !== "string" || descricao.trim() === "") {
    return res.status(400).json({ erro: "Descrição é obrigatória" });
  }

  // Cria a nova tarefa através do Model
  const tarefaCriada = TarefaModel.criarNovaTarefa(descricao);

  // Retorna status 201 (criado com sucesso)
  res.status(201).json({
    mensagem: "Tarefa criada com sucesso!",
    tarefa: tarefaCriada
  });
}

/**
 * Atualiza parcialmente uma tarefa existente
 * @route PATCH /tarefas/:id
 */
export function atualizarTarefa(req, res) {
  // Converte o id da URL para número
  const idNumero = Number(req.params.id);

  // Pega os dados enviados no corpo da requisição
  const { descricao, concluida } = req.body;

  // Valida o id
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  // Valida a descrição, se ela foi enviada
  if (
    descricao !== undefined &&
    (typeof descricao !== "string" || descricao.trim() === "")
  ) {
    return res.status(400).json({ erro: "Descrição inválida" });
  }

  // Valida o status concluida, se ele foi enviado
  if (concluida !== undefined && typeof concluida !== "boolean") {
    return res.status(400).json({ erro: "concluida deve ser boolean" });
  }

  // Tenta atualizar a tarefa através do Model
  const tarefaAtualizada = TarefaModel.atualizarTarefa(
    idNumero,
    descricao,
    concluida
  );

  // Se não encontrar a tarefa, retorna erro 404
  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Se atualizar com sucesso, retorna a tarefa atualizada
  res.json({
    mensagem: "Tarefa atualizada com sucesso!",
    tarefa: tarefaAtualizada
  });
}

/**
 * Remove uma tarefa pelo id
 * @route DELETE /tarefas/:id
 */
export function excluirTarefa(req, res) {
  // Converte o id da URL para número
  const idNumero = Number(req.params.id);

  // Valida o id
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  // Tenta excluir a tarefa através do Model
  const tarefaRemovida = TarefaModel.excluirTarefa(idNumero);

  // Se não encontrar, retorna erro 404
  if (!tarefaRemovida) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Retorna a tarefa que foi removida
  res.json({
    mensagem: "Tarefa excluída com sucesso!",
    tarefa: tarefaRemovida
  });
}

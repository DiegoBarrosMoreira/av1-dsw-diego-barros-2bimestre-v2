import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Lista todas as tarefas.
 * @route GET /tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    return res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return res.status(500).json({ erro: "Erro interno ao listar tarefas" });
  }
}

/**
 * Busca uma tarefa por ID.
 * @route GET /tarefas/:id
 */
export async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefa = await TarefaModel.buscarPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa por ID:", error);
    return res.status(500).json({ erro: "Erro interno ao buscar tarefa" });
  }
}

/**
 * Cria uma nova tarefa.
 * @route POST /tarefas
 */
export async function criar(req, res) {
  const { title, description, completed, categoryId } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "O campo title é obrigatório" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ erro: "O campo description deve ser string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "O campo completed deve ser boolean" });
  }

  if (categoryId !== undefined && typeof categoryId !== "number") {
    return res.status(400).json({ erro: "O campo categoryId deve ser number" });
  }

  try {
    const tarefaCriada = await TarefaModel.criar({
      title: title.trim(),
      description: description?.trim(),
      completed,
      categoryId
    });

    return res.status(201).json({
      mensagem: "Tarefa criada com sucesso!",
      tarefa: tarefaCriada
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao criar tarefa" });
  }
}

/**
 * Atualiza uma tarefa existente.
 * @route PUT /tarefas/:id
 */
export async function atualizar(req, res) {
  const id = Number(req.params.id);
  const { title, description, completed, categoryId } = req.body;

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const dadosAtualizacao = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "O campo title deve ser string não vazio" });
    }
    dadosAtualizacao.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({ erro: "O campo description deve ser string" });
    }
    dadosAtualizacao.description = description.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ erro: "O campo completed deve ser boolean" });
    }
    dadosAtualizacao.completed = completed;
  }

  if (categoryId !== undefined) {
    if (typeof categoryId !== "number") {
      return res.status(400).json({ erro: "O campo categoryId deve ser number" });
    }
    dadosAtualizacao.categoryId = categoryId;
  }

  if (Object.keys(dadosAtualizacao).length === 0) {
    return res.status(400).json({ erro: "Nenhum campo válido enviado para atualização" });
  }

  try {
    const tarefaAtualizada = await TarefaModel.atualizar(id, dadosAtualizacao);

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao atualizar tarefa" });
  }
}

/**
 * Exclui uma tarefa pelo ID.
 * @route DELETE /tarefas/:id
 */
export async function excluir(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefaRemovida = await TarefaModel.excluir(id);

    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa: tarefaRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return res.status(500).json({ erro: "Erro interno ao excluir tarefa" });
  }
}

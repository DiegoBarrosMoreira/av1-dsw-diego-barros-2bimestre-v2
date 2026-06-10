import { prisma } from "../config/prisma.js";

/**
 * Lista todas as tarefas registradas.
 * @returns {Promise<Array>} Lista de tarefas
 */
export async function listar() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" }
  });
}

/**
 * Busca uma tarefa por ID.
 * @param {number} id
 * @returns {Promise<Object|null>} Tarefa encontrada ou null
 */
export async function buscarPorId(id) {
  return prisma.task.findUnique({
    where: { id }
  });
}

/**
 * Cria uma nova tarefa.
 * @param {Object} dados
 * @param {string} dados.title
 * @param {string|null} dados.description
 * @param {boolean} [dados.completed=false]
 * @param {number|null} dados.categoryId
 * @returns {Promise<Object>} Tarefa criada
 */
export async function criar(dados) {
  return prisma.task.create({
    data: {
      title: dados.title,
      description: dados.description ?? null,
      completed: dados.completed ?? false,
      categoryId: dados.categoryId ?? null
    }
  });
}

/**
 * Atualiza uma tarefa existente.
 * @param {number} id
 * @param {Object} dados
 * @returns {Promise<Object|null>} Tarefa atualizada ou null se não encontrar
 */
export async function atualizar(id, dados) {
  try {
    return await prisma.task.update({
      where: { id },
      data: {
        ...(dados.title !== undefined && { title: dados.title }),
        ...(dados.description !== undefined && { description: dados.description ?? null }),
        ...(dados.completed !== undefined && { completed: dados.completed }),
        ...(dados.categoryId !== undefined && { categoryId: dados.categoryId ?? null })
      }
    });
  } catch (error) {
    if (error?.code === "P2025") {
      return null;
    }
    throw error;
  }
}

/**
 * Exclui uma tarefa pelo ID.
 * @param {number} id
 * @returns {Promise<Object|null>} Tarefa excluída ou null se não encontrar
 */
export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    if (error?.code === "P2025") {
      return null;
    }
    throw error;
  }
}

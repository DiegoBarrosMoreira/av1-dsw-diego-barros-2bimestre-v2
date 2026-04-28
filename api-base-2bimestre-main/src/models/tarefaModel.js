// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Esta camada é responsável por:
// - Armazenar os dados (em memória, banco de dados, etc.)
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

/**
 * Array que armazena as tarefas temporariamente
 * Observação: esses dados somem quando o servidor reinicia
 * Futuramente, isso será substituído por um banco de dados
 */
const tarefas = [
  { id: 1, descricao: "Estudar química", concluida: false },
  { id: 2, descricao: "Criar páginas no Figma", concluida: true }
];

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Procura o índice de uma tarefa no array com base no id
 * @param {number} id - ID da tarefa a ser encontrada
 * @returns {number} - Índice da tarefa ou -1 se não encontrar
 */
function encontrarIndiceTarefa(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      return i;
    }
  }
  return -1;
}

/**
 * Gera um novo id para a próxima tarefa
 * Se o array estiver vazio, começa com 1
 * Caso contrário, pega o maior id existente e soma 1
 * @returns {number} - Novo ID gerado
 */
function gerarNovoId() {
  if (tarefas.length === 0) return 1;

  let maiorId = 0;
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id > maiorId) {
      maiorId = tarefas[i].id;
    }
  }

  return maiorId + 1;
}

// ========================================
// OPERAÇÕES CRUD
// ========================================

/**
 * Retorna todas as tarefas cadastradas
 * @returns {Array} - Array com todas as tarefas
 */
export function obterTodasTarefas() {
  return tarefas;
}

/**
 * Procura uma tarefa específica pelo id
 * @param {number} id - ID da tarefa a ser buscada
 * @returns {Object|null} - A tarefa encontrada ou null
 */
export function obterTarefaPorId(id) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  return tarefas[indice];
}

/**
 * Cria uma nova tarefa
 * A descrição é limpa com trim() para remover espaços extras
 * Toda nova tarefa começa com concluida = false
 * @param {string} descricao - Descrição da nova tarefa
 * @returns {Object} - A tarefa criada
 */
export function criarNovaTarefa(descricao) {
  const novaTarefa = {
    id: gerarNovoId(),
    descricao: descricao.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Atualiza uma tarefa existente
 * Pode atualizar a descrição e/ou o status de conclusão
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {string} novaDescricao - Nova descrição (opcional)
 * @param {boolean} novoStatus - Novo status de conclusão (opcional)
 * @returns {Object|null} - A tarefa atualizada ou null se não encontrar
 */
export function atualizarTarefa(id, novaDescricao, novoStatus) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  const tarefa = tarefas[indice];

  // Atualiza a descrição apenas se ela foi enviada
  if (novaDescricao !== undefined) {
    tarefa.descricao = novaDescricao.trim();
  }

  // Atualiza o status apenas se ele foi enviado
  if (novoStatus !== undefined) {
    tarefa.concluida = novoStatus;
  }

  return tarefa;
}

/**
 * Exclui uma tarefa pelo id
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {Object|null} - A tarefa removida ou null se não encontrar
 */
export function excluirTarefa(id) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  const tarefaRemovida = tarefas[indice];

  // Remove 1 elemento do array na posição encontrada
  tarefas.splice(indice, 1);

  return tarefaRemovida;
}

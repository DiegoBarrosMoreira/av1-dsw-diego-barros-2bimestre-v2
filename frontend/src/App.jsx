import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/tarefas`)
      if (!response.ok) {
        throw new Error('Não foi possível carregar as tarefas.')
      }
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('O título da tarefa é obrigatório.')
      return
    }

    try {
      setError('')
      const response = await fetch(`${API_BASE_URL}/tarefas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa.')
      }

      setTitle('')
      setDescription('')
      await fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      setError('')
      const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir tarefa.')
      }

      await fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(id, updates) {
    try {
      setError('')
      const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa.')
      }

      await fetchTasks()
      setEditingId(null)
      setEditTitle('')
      setEditDescription('')
    } catch (err) {
      setError(err.message)
    }
  }

  function startEditing(task) {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
  }

  function cancelEditing() {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
    setError('')
  }

  async function handleSaveEdit(id) {
    if (!editTitle.trim()) {
      setError('O título da tarefa é obrigatório.')
      return
    }

    await handleUpdate(id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    })
  }

  async function handleToggleComplete(task) {
    await handleUpdate(task.id, {
      completed: !task.completed
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Lista de Tarefas</h1>
          <p>Gerencie tarefas com exclusão, edição e conclusão.</p>
        </div>
        <div className="status-bar">
          <span>{tasks.filter((task) => task.completed).length} concluídas</span>
          <span>{tasks.length} no total</span>
        </div>
      </header>

      <section className="task-card">
        <form className="task-form" onSubmit={handleCreate}>
          <div className="field-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Nova tarefa"
            />
          </div>
          <div className="field-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Detalhes adicionais (opcional)"
            />
          </div>
          <button type="submit" className="primary-button">
            Adicionar tarefa
          </button>
        </form>
      </section>

      {error && <div className="error-message">{error}</div>}

      <section className="task-list-card">
        <div className="task-list-header">
          <h2>Minhas tarefas</h2>
          <button type="button" className="secondary-button" onClick={fetchTasks}>
            Atualizar
          </button>
        </div>

        {loading ? (
          <div className="loading">Carregando tarefas...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">Nenhuma tarefa encontrada.</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-main">
                  <div>
                    <div className="task-title-row">
                      <h3>{task.title}</h3>
                      <span className="status-pill">
                        {task.completed ? 'Concluída' : 'Pendente'}
                      </span>
                    </div>
                    <p>{task.description || 'Sem descrição'}</p>
                  </div>

                  <div className="task-actions">
                    <button type="button" onClick={() => handleToggleComplete(task)}>
                      {task.completed ? 'Reabrir' : 'Concluir'}
                    </button>
                    <button type="button" onClick={() => startEditing(task)}>
                      Editar
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDelete(task.id)}>
                      Excluir
                    </button>
                  </div>
                </div>

                {editingId === task.id && (
                  <div className="edit-panel">
                    <div className="field-group">
                      <label htmlFor="edit-title">Editar título</label>
                      <input
                        id="edit-title"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor="edit-description">Editar descrição</label>
                      <textarea
                        id="edit-description"
                        value={editDescription}
                        onChange={(event) => setEditDescription(event.target.value)}
                      />
                    </div>
                    <div className="edit-actions">
                      <button type="button" className="primary-button" onClick={() => handleSaveEdit(task.id)}>
                        Salvar
                      </button>
                      <button type="button" className="secondary-button" onClick={cancelEditing}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App

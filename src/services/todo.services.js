
import service from "./config.services";

const getAllTodosService = () => {
  return service.get("/todos")
}

const addNewTodoService = (newTodo) => {
  return service.post("/todos", newTodo)
}

const getTodoDetailsService = (id) => {
  return service.get(`/todos/${id}`)
}

const deleteTodoService = (id) => {
  return service.delete(`/todos/${id}`)
}

const editTodoService = (id, todo) => {
  return service.patch(`/todos/${id}`, todo)
}

export {
  getAllTodosService,
  addNewTodoService,
  getTodoDetailsService,
  deleteTodoService,
  editTodoService
}
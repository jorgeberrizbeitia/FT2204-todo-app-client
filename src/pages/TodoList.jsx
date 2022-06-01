import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import { Link, useNavigate } from "react-router-dom"
import { getAllTodosService } from "../services/todo.services";

function TodoList() {

  // 1. Estado para la data
  const [ allTodos, setAllTodos ] = useState(null)

  const navigate = useNavigate()
  // 2. ComponentDidMount
  useEffect(() => {
    getAllTodos()
  }, [])

  // 3. La funcion que busca la data
  const getAllTodos = async () => {

    try {
     
      // const response = await axios.get("http://localhost:5005/api/todos")
      const response = await getAllTodosService()

      setAllTodos(response.data)

    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
        // esto seria una forma sencilla de enviar el usuario a login cuando no tiene token/token invalido
        // pero hay una mejor => la mejor es con HOC IsPrivate
      } else {
        navigate("/error")
      }
    }
  }

  // if (allTodos === null) {
  //   return <h3>... Loading</h3>
  // }

  return (
    <div>
      <AddForm getAllTodos={getAllTodos}/>
      <hr />
      <h3>Lista de To-Do</h3>

      {/* // 4. el Loading */}
      {allTodos === null && <h3>... Loading</h3>}

      {allTodos !== null && allTodos.map((eachTodo) => {
          return (
            <div key={eachTodo._id}>
              {/* <p>{eachTodo.title}</p> */}
              <Link to={`/todos/${eachTodo._id}/details`}>{eachTodo.title}</Link>
            </div>
          )
        })}

    </div>
  );
}

export default TodoList;

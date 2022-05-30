import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import axios from "axios";
import { useNavigate } from "react-router-dom"

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
     
      const response = await axios.get("http://localhost:5005/api/todos")
      setAllTodos(response.data)

    } catch (error) {
      navigate("/error")
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
              <p>{eachTodo.title}</p>
            </div>
          )
        })}

    </div>
  );
}

export default TodoList;

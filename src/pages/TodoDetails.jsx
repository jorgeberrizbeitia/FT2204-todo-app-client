import { useEffect, useState } from "react";
import { deleteTodoService, getTodoDetailsService } from "../services/todo.services";
import { useParams, useNavigate, Link } from "react-router-dom";

function TodoDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [ todoDetails, setTodoDetails ] = useState(null)

  useEffect(() => {
    getTodoDetails()
  }, [])

  const getTodoDetails = async () => {

    try {
      
      const response = await getTodoDetailsService(id)
      setTodoDetails(response.data)

    } catch (error) {
      navigate("/error")
    }

  }

  const handleDelete = async () => {

    try {
      
      await deleteTodoService(id)
      navigate("/todos")

    } catch (error) {
      navigate("/error")
    }

  }

  if (todoDetails === null) {
    return <h3>... Loading</h3>
  }

  return (
    <div>
      <h3>Detalles de To-Do</h3>

      <h4>Title: {todoDetails.title}</h4>
      <p>Description: {todoDetails.description}</p>
      <p>Urgente: {todoDetails.isUrgent === true ? "YEAH!" : "Nah"}</p>
      <button onClick={handleDelete}>Borrar</button>
      <Link to={`/todos/${id}/edit`}><button>Edit</button></Link>

    </div>
  );
}

export default TodoDetails;

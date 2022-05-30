import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editTodoService, getTodoDetailsService } from "../services/todo.services";

function TodoEdit() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... edit the ToDo here

    try {
      
      const theTodo = {
        title,
        description,
        isUrgent
      }

      await editTodoService(id, theTodo)
      navigate(`/todos/${id}/details`)

    } catch (error) {
      navigate("/error")
    }
  };

  useEffect(() => {
    getTodoDetails()
  }, [])

  const getTodoDetails = async () => {

    try {

      const response = await getTodoDetailsService(id)
      const { title, description, isUrgent } = response.data  

      setTitle(title)
      setDescription(description)
      setIsUrgent(isUrgent)
      
    } catch (error) {
      navigate("/error")
    }

  }

  return (
    <div>
      <h3>Editar To-Do</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <label htmlFor="isUrgent">Urgent</label>
        <input
          type="checkbox"
          name="isUrgent"
          onChange={handleIsUrgentChange}
          checked={isUrgent}
        />

        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default TodoEdit;

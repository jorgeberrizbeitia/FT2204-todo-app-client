import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function AddForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const navigate = useNavigate()

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked); // en checkboxes no usamos .value sino .checked

  const handleSubmit = async (e) => {
    e.preventDefault()
    // ... add the ToDo here
    try {
      
      const newTodo = {
        title,
        description,
        isUrgent
      }

      await axios.post("http://localhost:5005/api/todos", newTodo)
      // navigate("/todos") // estoy en la misma pagina. No refresco nada >:)
      props.getAllTodos()

    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div>
      <h3>Agregar To-Do</h3>

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

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddForm;

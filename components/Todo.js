import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function Todo({ todo }) {
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const onToggleCompleted = () => {
    const updatedField = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };

    const updatedTodo = { id: todo.id, fields: updatedField };
    updateTodo(updatedTodo);
  };

  const onDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <li className='bg-green-400 flex items-center showow-lg rounded-lg my-2 py-2 px-4'>
      <input
        type='checkbox'
        name='completed'
        id='completed'
        checked={todo.fields.completed || ""}
        className='mr-2 form-checkbox h-5 w-5'
        onChange={onToggleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          todo.fields.completed && "line-through"
        }`}>
        {todo.fields.description}
      </p>
      <button
        type='button'
        onClick={() => onDeleteTodo(todo.id)}
        className='text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded'>
        Delete
      </button>
    </li>
  );
}

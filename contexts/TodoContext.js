import { createContext, useState } from "react";

const TodoContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (error) {
      throw error;
    }
  };

  const addTodo = async (description) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (error) {
      throw error;
    }
  };

  // const updateTodo = (updateTodo) => {
  //   try {
  //     await fetch("/api/updateTodo", {
  //       method: "PUT",
  //       body: JSON.stringify(updateTodo),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     setTodos((prevTodos) => {
  //       const existingTodos = [...prevTodos];
  //       const getUpdateTodo = existingTodos.find(
  //         (todo) => todo.id === updateTodo.id
  //       );
  //       getUpdateTodo.fields = updateTodo.fields;

  //       return existingTodos;
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const updateTodo = (updateTodo) => {
    fetch("/api/updateTodo", {
      method: "PUT",
      body: JSON.stringify(updateTodo),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => console.log("res11: ", res))
      .catch((err) => console.log("error: ", err));

    setTodos((prevTodos) => {
      const existingTodos = [...prevTodos];
      const getUpdateTodo = existingTodos.find(
        (todo) => todo.id === updateTodo.id
      );
      getUpdateTodo.fields = updateTodo.fields;

      return existingTodos;
    });

    console.log("tried");
  };

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodosProvider, TodoContext };

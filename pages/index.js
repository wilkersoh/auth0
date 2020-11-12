import { useEffect, useContext } from "react";
import Head from "next/head";
import Todo from "../components/Todo";
import { table, minifyRecords } from "./api/utils/Airtable";
import { TodoContext } from "../contexts/TodoContext";

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodoContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  console.log("--render---");
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <button className='px-6 py-2 bg-gray-500'>Logout</button>
      <button className='px-6 py-2 bg-green-500 mx-2'>Login</button>
      <main>
        <h1>Todo List</h1>
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (error) {
    return {
      props: {
        err: "something went wrong",
      },
    };
  }
}

import { useEffect, useContext } from "react";
import Head from "next/head";
import Todo from "../components/Todo";
import { table, minifyRecords } from "./api/utils/Airtable";
import { TodoContext } from "../contexts/TodoContext";
import auth0 from "./api/utils/auth0";
import TodoForm from "../components/TodoForm";

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodoContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className='flex justify-between'>
        <header>Auth and AirTable</header>
        <div>
          {user ? (
            <button className='px-6 py-2 bg-gray-500'>
              <a href='/api/logout'>Logout</a>
            </button>
          ) : (
            <button className='px-6 py-2 bg-green-500 mx-2'>
              <a href='/api/login'>Login</a>
            </button>
          )}
        </div>
      </nav>

      <main>
        <h1>Todo List</h1>
        {user && (
          <>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];
  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId ='${session.user.sub}'`, // filter the record only match the user
        })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
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

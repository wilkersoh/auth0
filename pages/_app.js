import "../styles/index.css";
import { TodosProvider } from "../contexts/TodoContext";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className='container mx-auto my-6'>
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;

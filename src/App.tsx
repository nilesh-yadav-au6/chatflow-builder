import "./index.css";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./pages/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <HomePage />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;

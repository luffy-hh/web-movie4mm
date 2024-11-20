import "./App.css";
import "plyr-react/plyr.css";

import Router from "./router/Router";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
}

export default App;

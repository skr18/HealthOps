import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import { initializeAuth } from "../features/auth/initialize-auth";
import App from "../App";

function Bootstrap() {
  useEffect(() => {
    initializeAuth(store.dispatch);
  }, []);

  return <App />;
}

export function AppProviders() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Bootstrap />
      </BrowserRouter>
    </Provider>
  );
}

//Provider makes the Redux store available to every component under it.
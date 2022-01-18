import { composeWithDevTools } from "@redux-devtools/extension";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import thunkMiddleware from "redux-thunk";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import "./index.css";
import persistedReducer from "./reducers/index";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

const history = createBrowserHistory();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

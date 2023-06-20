import React from "react";
import ReactDOM from "react-dom"
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { SelectedTaskProvider } from './task-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedTaskProvider>
        <App />
      </SelectedTaskProvider>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
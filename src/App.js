import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Login from "./Pages/login/login";
import Kasir from "./Pages/Kasir/kasir";
import Stock from "./Pages/Stock/stock";
import User from "./Pages/User/user";

const App = () => {
  const history = createBrowserHistory();
  if (history.location.pathname === "/") {
    history.push("/login");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/stok" element={<Stock />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

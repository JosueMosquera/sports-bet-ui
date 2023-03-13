import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./dashboards/login/Register";
import Login from "./dashboards/login/Login";

import Home from "./dashboards/home/Home";
import MyTransactions from "./dashboards/myTransactions";
import LoginAdmin from "./dashboards/login/LoginAdmin";
import AdminHome from "./dashboards/adminHome";
import TeamsAdmin from "./dashboards/adminHome/teams";
import MatchesAdmin from "./dashboards/adminHome/matches";
import AdminRegister from "./dashboards/adminHome/predictions";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-transactions",
    element: <MyTransactions />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login-admin",
    element: <LoginAdmin />,
  },
  {
    path: "/admin-home",
    element: <AdminHome />,
  },
  {
    path: "/admin-teams",
    element: <TeamsAdmin />,
  },
  {
    path: "/admin-matches",
    element: <MatchesAdmin />,
  },
  {
    path: "/admin-register",
    element: <AdminRegister />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { Box, Button, TextField } from "@mui/material";
import svg from "../../sports.svg";
import "./login.css";
import React from "react";
import { useUserReducer } from "./reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, changeInputValue } = useUserReducer();
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <Box>
        <h3 className="primary-title">Bienvenido!</h3>
        <form
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault();
            login();
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
        >
          <p className="primary-title">plataforma de apuestas deportivas</p>

          <TextField
            id="outlined-basic"
            label="email"
            name="loginUserEmail"
            variant="outlined"
            required
            className="form-input"
            onChange={(e) => changeInputValue(e.target.name, e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="loginUserPassword"
            required
            className="form-input"
            onChange={(e) => changeInputValue(e.target.name, e.target.value)}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          <a href="/register" className="primary-title">
            Registrarme
          </a>
        </form>
      </Box>
      <div className="svg-container">
        <img src={svg} alt="login" className="svg-image" />
      </div>
    </div>
  );
};

export default Login;

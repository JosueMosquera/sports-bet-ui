import { AppBar, Box, Button, TextField, Toolbar } from "@mui/material";
import svg from "./sports.svg";
import "./login.css";
import React from "react";
import { useUserReducer } from "./reducer";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const { register, changeInputValue } = useUserReducer();
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            title="Menu Principal"
            onClick={() => navigate("/admin-home")}
            type="button"
            color="warning"
            variant="contained"
            style={{ marginRight: 10 }}
          >
            Ir Al Menu Principal
          </Button>
        </Toolbar>
      </AppBar>
      <div className="login-container">
        <Box>
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <h3 className="primary-title">Registra un Administrador</h3>
            <TextField
              id="outlined-basic"
              label="nombre de usuario"
              name="registerUserName"
              variant="outlined"
              required
              className="form-input"
              onChange={(e) => changeInputValue(e.target.name, e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="email"
              name="registerUserEmail"
              variant="outlined"
              required
              className="form-input"
              onChange={(e) => changeInputValue(e.target.name, e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              name="registerUserPassword"
              required
              className="form-input"
              onChange={(e) => changeInputValue(e.target.name, e.target.value)}
            />
            <Button type="submit" variant="contained">
              Registrar
            </Button>
            <a href="/login" className="primary-title">
              Iniciar Sesión
            </a>
          </form>
        </Box>
        <div className="svg-container">
          <img src={svg} alt="login" className="svg-image" />
        </div>
      </div>
    </>
  );
};

export default AdminRegister;

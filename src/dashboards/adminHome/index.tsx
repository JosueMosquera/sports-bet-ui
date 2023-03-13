import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import "./adminHome.css";

import svg from "../../admin.svg";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    name: "Equipos",
    path: "/admin-teams",
  },
  {
    name: "Partidos",
    path: "/admin-matches",
  },
  {
    name: "Crear Administrador",
    path: "/admin-register",
  },
];

const AdminHome = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="admin-home-container">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Button
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("user");
                }}
                type="button"
                color="error"
                variant="contained"
              >
                Cerrar Sesión
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href={page.path}>{page.name}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    href={page.path}
                    sx={{ my: 1, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
            <Button
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("user");
              }}
              type="button"
              color="error"
              variant="contained"
            >
              Cerrar Sesión
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Typography variant="h4" color={"white"} textAlign="center" mt={2}>
        Modulo de Administración
      </Typography>
      <div className="draw-container">
        <img src={svg} alt="admin" className="admin-svg" />
      </div>
    </div>
  );
};

export default AdminHome;

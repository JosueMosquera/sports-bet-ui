import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Delete, Edit } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTeamsReducer } from "./reducer";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#212630",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const TeamsAdmin = () => {
  const {
    teams,
    createTeam,
    handleTeamData,
    deleteTeam,
    editTeam,
    handleEditTeamData,
    selectTeam,
    selectedTeam,
  } = useTeamsReducer();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const submitForm = async () => {
    await createTeam();
    handleClose();
  };
  const submitEditForm = async () => {
    await editTeam();
    handleCloseEditModal();
  };

  const navigate = useNavigate();
  return teams.length > 0 ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Button
              title="Crear Equipo"
              onClick={handleOpen}
              type="button"
              color="success"
              variant="contained"
              style={{ marginRight: 10 }}
            >
              Crear Equipo
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        className="transactions-container"
        style={{ backgroundColor: "#212630", height: "100vh", paddingTop: 20 }}
      >
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id Equipo</StyledTableCell>
                  <StyledTableCell>Nombre</StyledTableCell>
                  <StyledTableCell align="right">Imagen</StyledTableCell>
                  <StyledTableCell align="right">
                    Fecha de creación
                  </StyledTableCell>
                  <StyledTableCell align="right">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <StyledTableRow key={team.id}>
                    <StyledTableCell component="th" scope="row">
                      {team.id}
                    </StyledTableCell>
                    <StyledTableCell>{team.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      <img
                        src={team.teamImage}
                        alt="logo"
                        style={{ width: 70, height: 70 }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {format(new Date(team.createdAt), "MM/dd/yyyy", {
                        locale: es,
                      })}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Tooltip title="Borrar">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => deleteTeam(team.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => [
                            handleOpenEditModal(),
                            selectTeam(team),
                          ]}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <h3 className="primary-title">Nuevo Equipo</h3>
            <TextField
              id="outlined-basic"
              label="nombre del equipo"
              name="name"
              variant="outlined"
              required
              className="form-input"
              onChange={(e) => handleTeamData(e.target.name, e.target.value)}
            />
            <Typography color={"white"} align={"left"}>
              Imagen
            </Typography>
            <input
              type="file"
              accept="image/*"
              color="white"
              placeholder="imagen del equipo"
              onChange={(e) =>
                handleTeamData(
                  "teamImage",
                  e.target.files ? e.target.files[0] : ""
                )
              }
            />
            <Button type="submit" variant="contained">
              Crear Equipo
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              submitEditForm();
            }}
          >
            <h3 className="primary-title">Editar Equipo</h3>
            <TextField
              id="outlined-basic"
              label="nombre del equipo"
              name="name"
              variant="outlined"
              required
              defaultValue={selectedTeam?.name}
              className="form-input"
              onChange={(e) =>
                handleEditTeamData(e.target.name, e.target.value)
              }
            />
            <Typography color={"white"} align={"left"}>
              Imagen
            </Typography>
            <input
              type="file"
              accept="image/*"
              color="white"
              placeholder="imagen del equipo"
              onChange={(e) =>
                handleEditTeamData(
                  "teamImage",
                  e.target.files ? e.target.files[0] : ""
                )
              }
            />
            <Button type="submit" variant="contained">
              Editar Equipo
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Button
              title="Crear Equipo"
              onClick={handleOpen}
              type="button"
              color="success"
              variant="contained"
              style={{ marginRight: 10 }}
            >
              Crear Equipo
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        className="transactions-container"
        style={{ backgroundColor: "#212630", height: "100vh", paddingTop: 20 }}
      >
        <Container>
          <Typography color={"white"} variant="h3">
            Aún no hay equipos creados
          </Typography>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              className="form-container"
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <h3 className="primary-title">Nuevo Equipo</h3>
              <TextField
                id="outlined-basic"
                label="nombre del equipo"
                name="name"
                variant="outlined"
                required
                className="form-input"
                onChange={(e) => handleTeamData(e.target.name, e.target.value)}
              />
              <Typography color={"white"} align={"left"}>
                Imagen
              </Typography>
              <input
                type="file"
                accept="image/*"
                color="white"
                placeholder="imagen del equipo"
                onChange={(e) =>
                  handleTeamData(
                    "teamImage",
                    e.target.files ? e.target.files[0] : ""
                  )
                }
              />
              <Button type="submit" variant="contained">
                Crear Equipo
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default TeamsAdmin;

import { Edit } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { useMatchesReducer } from "./reducer";
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
const MatchesAdmin = () => {
  const navigate = useNavigate();
  const {
    matches,
    changeInputValue,
    changeOptionValue,
    finishMatch,
    startMatch,
    teams,
    createMatch,
    handleEditMatchData,
    selectedMatch,
    editMatch,
    selectMatch,
  } = useMatchesReducer();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = React.useState<Date>();

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  let footer = <p>Escoge un dia.</p>;
  if (selected) {
    footer = <p>Escogiste {format(selected, "PP")}.</p>;
  }
  const submitForm = async () => {
    await createMatch();
    handleClose();
  };

  const submitEditForm = async () => {
    await editMatch();
    handleCloseEditModal();
  };

  return matches.length < 0 ? (
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
              Crear Partido
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
            Aún no hay partidos creados..
          </Typography>
        </Container>
      </div>
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
              Crear Partido
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        className="transactions-container"
        style={{ backgroundColor: "#212630", height: "100vh", paddingTop: 20 }}
      >
        <Container>
          <Typography color={"white"} variant="h4" align="center" mb={2}>
            Partidos
          </Typography>
          <Grid container spacing={1} gap={5}>
            {matches.map((match) => (
              <Card key={match.id}>
                <CardContent>
                  {!match.isMatchFinished && (
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => [
                          handleOpenEditModal(),
                          selectMatch(match),
                        ]}
                      >
                        <Edit fontSize={"medium"} />
                      </IconButton>
                    </Tooltip>
                  )}

                  <p>
                    {format(new Date(match.matchDate), "MM/dd/yyyy", {
                      locale: es,
                    })}
                  </p>
                  {match.isMatchFinished && (
                    <Alert severity="success">
                      <AlertTitle>El partido finalizo</AlertTitle>
                    </Alert>
                  )}
                  <p>Tipo de apuesta: paga x{match.betOffer}</p>
                  <p>
                    {match.teamA.name} - {match.teamB.name}
                  </p>
                  <div className="images-container">
                    <img
                      src={match.teamA.teamImage}
                      alt="team-a"
                      className="team-image"
                    />
                    <img
                      src="https://st2.depositphotos.com/2877797/8963/v/600/depositphotos_89636676-stock-illustration-symbol-competition-vs-vector-illustration.jpg"
                      alt="vs"
                      className="team-image"
                    />
                    <img
                      src={match.teamB.teamImage}
                      alt="team-b"
                      className="team-image"
                    />
                  </div>
                  <>
                    <div className="bet-options">
                      {match.isMatchStarted && (
                        <FormControl disabled={match.isMatchFinished}>
                          <RadioGroup
                            defaultValue={
                              match.result
                                ? "isTeamAwins"
                                : match.result
                                ? "isTeamBwins"
                                : "isAdraft"
                            }
                            row
                            name="row-radio-buttons-group"
                            sx={{ gap: 1 }}
                            onChange={(e) =>
                              changeOptionValue({
                                name: e.target.value,
                                value: e.target.checked,
                              })
                            }
                          >
                            <FormControlLabel
                              value="isTeamAwins"
                              control={<Radio />}
                              label="Gano"
                            />
                            <FormControlLabel
                              value="isAdraft"
                              control={<Radio />}
                              label="Empato"
                            />
                            <FormControlLabel
                              value="isTeamBwins"
                              control={<Radio />}
                              label="Gano"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    </div>

                    <div className="bet-details">
                      {!match.isMatchStarted && (
                        <Button
                          type="submit"
                          variant="contained"
                          color="warning"
                          onClick={async () => await startMatch(match.id)}
                        >
                          Comenzar Partido
                        </Button>
                      )}

                      {!match.isMatchFinished && match.isMatchStarted && (
                        <form
                          className="bet-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            onClick={async () => await finishMatch(match.id)}
                          >
                            Guardar Resultado
                          </Button>
                        </form>
                      )}
                    </div>
                  </>
                </CardContent>
              </Card>
            ))}
          </Grid>
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
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <h3 className="primary-title">Nuevo Partido</h3>

            <p style={{ color: "white" }}>Equipo A</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(_, option: any) => {
                changeInputValue("teamA", option.value);
              }}
              options={teams}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Equipo A" required />
              )}
            />
            <p style={{ color: "white" }}>Equipo B</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teams}
              onChange={(_, option: any) => {
                changeInputValue("teamB", option.value);
              }}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Equipo B" required />
              )}
            />
            <p style={{ color: "white" }}>Fecha del partido</p>
            <Box style={{ backgroundColor: "white" }} mt={2}>
              <DayPicker
                locale={es}
                mode="single"
                selected={selected}
                onSelect={(date) => [
                  setSelected(date),
                  changeInputValue("matchDate", date),
                ]}
                footer={footer}
              />
            </Box>
            <p style={{ color: "white" }}>Oferta de ganancia</p>
            <TextField
              style={{ marginTop: 5 }}
              id="outlined-basic"
              label="Oferta de ganancia"
              inputProps={{ min: 0 }}
              type="number"
              variant="outlined"
              name="betOffer"
              required
              className="form-input"
              onChange={(e) => changeInputValue(e.target.name, e.target.value)}
            />
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
              Crear Partido
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
            onSubmit={(e) => {
              e.preventDefault();
              submitEditForm();
            }}
          >
            <h3 className="primary-title">Editar Partido</h3>

            <p style={{ color: "white" }}>Equipo A</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(_, option: any) => {
                changeInputValue("teamA", option.value);
              }}
              defaultValue={
                teams.filter(
                  (team) => team.label === selectedMatch?.teamA.name
                )[0]
              }
              options={teams}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Equipo A" required />
              )}
            />
            <p style={{ color: "white" }}>Equipo B</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teams}
              defaultValue={
                teams.filter(
                  (team) => team.label === selectedMatch?.teamB.name
                )[0]
              }
              onChange={(_, option: any) => {
                changeInputValue("teamB", option.value);
              }}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Equipo B" required />
              )}
            />
            <p style={{ color: "white" }}>Fecha del partido</p>
            <Box style={{ backgroundColor: "white" }} mt={2}>
              <DayPicker
                locale={es}
                mode="single"
                selected={selected}
                onSelect={(date) => [
                  setSelected(date),
                  handleEditMatchData("matchDate", date),
                ]}
                footer={footer}
              />
            </Box>
            <p style={{ color: "white" }}>Oferta de ganancia</p>
            <TextField
              style={{ marginTop: 5 }}
              id="outlined-basic"
              label="Oferta de ganancia"
              inputProps={{ min: 0 }}
              type="number"
              variant="outlined"
              defaultValue={selectedMatch?.betOffer}
              name="betOffer"
              required
              className="form-input"
              onChange={(e) =>
                handleEditMatchData(e.target.name, e.target.value)
              }
            />
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
              Editar Partido
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default MatchesAdmin;

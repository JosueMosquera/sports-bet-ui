import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useCreditsReducer } from "./reducer";
const Home = () => {
  const navigate = useNavigate();
  const {
    user,
    addCredits,
    changeInputValue,
    ammount,
    creditCardCode,
    matches,
    matchPredictions,
    predictMatch,
    changeOptionValue,
    editPredictMatch,
    removePredictMatch,
  } = useCreditsReducer();

  return (
    <div className="home-container">
      {user !== null || user !== undefined ? (
        <>
          <div className="principal-container">
            <h4 className="primary-title"> Bienvenido {user?.userEmail}</h4>
            <h4 className="primary-title">
              Creditos Disponibles:{user?.availableCredits}
            </h4>
            <Button
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("user");
              }}
              type="button"
              variant="contained"
            >
              Cerrar Sesión
            </Button>
            <div className="add-credits-container">
              <form
                className="form-container"
                onSubmit={(e) => {
                  e.preventDefault();
                  addCredits();
                }}
              >
                <h4 className="primary-title">Agregar Creditos</h4>
                <TextField
                  id="outlined-basic"
                  label="monto"
                  name="ammount"
                  variant="outlined"
                  required
                  className="form-input"
                  onChange={(e) =>
                    changeInputValue(e.target.name, e.target.value)
                  }
                  value={ammount}
                />
                <TextField
                  id="outlined-basic"
                  label="numero de tarjeta de debito o credito"
                  variant="outlined"
                  name="creditCardCode"
                  required
                  className="form-input"
                  onChange={(e) =>
                    changeInputValue(e.target.name, e.target.value)
                  }
                  value={creditCardCode}
                />
                <Button type="submit" variant="contained">
                  Agregar Creditos
                </Button>
              </form>
            </div>
          </div>
          <div className="matches-container">
            {matches && matches.length > 0 ? (
              <>
                {matches.map(
                  (match) =>
                    !match.isBeted && (
                      <Card className="match-card" key={match.id}>
                        <CardContent>
                          <p>
                            {format(new Date(match.matchDate), "MM/dd/yyyy", {
                              locale: es,
                            })}
                          </p>
                          {match.isMatchStarted && (
                            <Alert severity="warning">
                              <AlertTitle>El partido a comenzado</AlertTitle>
                              no se reciben mas apuestas, ni se puede cambiar el
                              resultado.
                            </Alert>
                          )}
                          <p>Tipo de apuesta: paga x{match.betOffer}</p>
                          <p>
                            {match.teamA} - {match.teamB}
                          </p>
                          <div className="images-container">
                            <img
                              src={match.teamAimage}
                              alt="team-a"
                              className="team-image"
                            />
                            <img
                              src={match.teamBimage}
                              alt="team-b"
                              className="team-image"
                            />
                          </div>
                          {!match.isMatchStarted && (
                            <>
                              <div className="bet-options">
                                <FormControl>
                                  <RadioGroup
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
                                      label="Gana"
                                    />
                                    <FormControlLabel
                                      value="isAdraft"
                                      control={<Radio />}
                                      label="Empata"
                                    />
                                    <FormControlLabel
                                      value="isTeamBwins"
                                      control={<Radio />}
                                      label="Gana"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                              <div className="bet-details">
                                <form
                                  className="bet-form"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    predictMatch(match);
                                  }}
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="monto"
                                    name="betAmmount"
                                    variant="outlined"
                                    required
                                    className="form-input"
                                    onChange={(e) =>
                                      changeInputValue(
                                        e.target.name,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <TextField
                                    id="outlined-basic"
                                    label="numero de tarjeta de debito o credito"
                                    variant="outlined"
                                    name="betCreditCardCode"
                                    required
                                    className="form-input"
                                    onChange={(e) =>
                                      changeInputValue(
                                        e.target.name,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <Button type="submit" variant="contained">
                                    Registrar Apuesta
                                  </Button>
                                </form>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    )
                )}
                {matchPredictions.length > 0 &&
                  matchPredictions.map((prediction) => (
                    <Card className="match-card" key={prediction.id}>
                      <CardContent>
                        <h5>Tú apuesta</h5>
                        <p>
                          {format(
                            new Date(prediction.match.matchDate),
                            "MM/dd/yyyy",
                            {
                              locale: es,
                            }
                          )}
                        </p>
                        {prediction.match.isMatchStarted && (
                          <Alert severity="warning">
                            <AlertTitle>El partido a comenzado</AlertTitle>
                            no se reciben mas apuestas, ni se puede cambiar el
                            resultado.
                          </Alert>
                        )}
                        <p>
                          Tipo de apuesta: paga x{prediction.match.betOffer}
                        </p>
                        <p>
                          {prediction.match.teamA} - {prediction.match.teamB}
                        </p>
                        <div className="images-container">
                          <img
                            src={prediction.match.teamAimage}
                            alt="team-a"
                            className="team-image"
                          />
                          <img
                            src={prediction.match.teamBimage}
                            alt="team-b"
                            className="team-image"
                          />
                        </div>
                        <div className="bet-options">
                          <FormControl
                            disabled={prediction.match.isMatchStarted}
                          >
                            <RadioGroup
                              defaultValue={
                                prediction.isTeamAwins
                                  ? "isTeamAwins"
                                  : prediction.isTeamBwins
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
                                label="Gana"
                              />
                              <FormControlLabel
                                value="isAdraft"
                                control={<Radio />}
                                label="Empata"
                              />
                              <FormControlLabel
                                value="isTeamBwins"
                                control={<Radio />}
                                label="Gana"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <div className="bet-details">
                          <form
                            className="bet-form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              editPredictMatch(prediction.id, prediction.match);
                            }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={prediction.match.isMatchStarted}
                            >
                              Editar Apuesta
                            </Button>
                            <Button
                              type="button"
                              variant="contained"
                              color="error"
                              disabled={prediction.match.isMatchStarted}
                              onClick={() => removePredictMatch(prediction.id)}
                            >
                              Eliminar Apuesta
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </>
            ) : (
              <h3 className="primary-title">no hay partidos para mostrar</h3>
            )}
          </div>
        </>
      ) : (
        <div className="to-login-container">
          <h3 className="primary-title">
            Tu usuario no se encuentra registrado, o las credenciales son
            incorrectas
          </h3>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            variant="contained"
          >
            Iniciar Sesion o registrarse
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;

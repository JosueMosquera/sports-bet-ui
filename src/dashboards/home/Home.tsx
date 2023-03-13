import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
//@ts-ignore
import CreditCardInput from "react-credit-card-input";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useCreditsReducer } from "./reducer";
const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h5 className="primary-title">
                {" "}
                Bienvenido {user?.userEmail} Creditos Disponibles:
                {user?.availableCredits}
              </h5>
            </Typography>
            <Button
              title="Mis Transacciones"
              onClick={() => navigate("/my-transactions")}
              type="button"
              color="warning"
              variant="contained"
              style={{ marginRight: 10 }}
            >
              Mis Transacciones
            </Button>

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
        </AppBar>
      </Box>
      <div className="home-container">
        {user !== null || user !== undefined ? (
          <>
            <div className="principal-container">
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
                    inputProps={{ min: 1, max: 5000 }}
                    type="number"
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

                  {/*   <TextField
                    id="outlined-basic"
                    label="Fecha de expiración de la tarjeta"
                    inputProps={{ min: 0 }}
                    type="number"
                    variant="outlined"
                    name="creditCardCode"
                    required
                    className="form-input"
                    onChange={(e) =>
                      changeInputValue(e.target.name, e.target.value)
                    }
                    value={creditCardCode}
                  />
                  <TextField
                    id="outlined-basic"
                    label="3 digitos de seguridad de la tarjeta ver reverso de la tarjeta"
                    inputProps={{ min: 0 }}
                    type="number"
                    variant="outlined"
                    name="creditCardCode"
                    required
                    className="form-input"
                    onChange={(e) =>
                      changeInputValue(e.target.name, e.target.value)
                    }
                    value={creditCardCode}
                  /> */}

                  <p style={{ textAlign: "right", color: "white" }}>
                    tarjeta de debito/credito
                  </p>
                  <CreditCardInput
                    containerStyle={{ marginLeft: 30, marginRight: 30 }}
                    cardCVCInputRenderer={({
                      handleCardCVCChange,
                      props,
                    }: any) => <input {...props} />}
                    cardExpiryInputRenderer={({
                      handleCardExpiryChange,
                      props,
                    }: any) => <input {...props} />}
                    cardNumberInputRenderer={({
                      handleCardNumberChange,
                      props,
                    }: any) => (
                      <input
                        {...props}
                        name={"creditCardCode"}
                        onChange={(e) =>
                          changeInputValue(e.target.name, e.target.value)
                        }
                      />
                    )}
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
                                no se reciben mas apuestas, ni se puede cambiar
                                el resultado.
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
                          {prediction.match.isMatchStarted &&
                          !prediction.match.isMatchFinished ? (
                            <Alert severity="warning">
                              <AlertTitle>El partido a comenzado</AlertTitle>
                              no se reciben mas apuestas, ni se puede cambiar el
                              resultado.
                            </Alert>
                          ) : prediction.match.isMatchFinished &&
                            prediction.match.isMatchStarted &&
                            prediction.match.isWined ? (
                            <Alert severity="success">
                              <AlertTitle>Felicidades ganaste!</AlertTitle>
                              se sumaran a sus creditos la ganancia acordada.
                              puede ver el detalle en el menu de transacciones.
                            </Alert>
                          ) : prediction.match.isMatchFinished &&
                            prediction.match.isMatchStarted &&
                            !prediction.match.isWined ? (
                            <Alert severity="error">
                              <AlertTitle>No acertaste</AlertTitle>
                              esta vez no acertaste,mejor suerte para la
                              proxima.
                            </Alert>
                          ) : null}
                          <p>
                            Tipo de apuesta: paga x{prediction.match.betOffer}
                          </p>
                          <p>
                            {prediction.match.teamA.name} -{" "}
                            {prediction.match.teamB.name}
                          </p>
                          <div className="images-container">
                            <img
                              src={prediction.match.teamA.teamImage}
                              alt="team-a"
                              className="team-image"
                            />
                            <img
                              src="https://st2.depositphotos.com/2877797/8963/v/600/depositphotos_89636676-stock-illustration-symbol-competition-vs-vector-illustration.jpg"
                              alt="vs"
                              className="team-image"
                            />
                            <img
                              src={prediction.match.teamB.teamImage}
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
                                editPredictMatch(
                                  prediction.id,
                                  prediction.match
                                );
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
                                onClick={() =>
                                  removePredictMatch(prediction.id)
                                }
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
    </>
  );
};

export default Home;

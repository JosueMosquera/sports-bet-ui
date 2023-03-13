import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTransactionsReducer } from "./reducer";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const MyTransactions = () => {
  const { transactions } = useTransactionsReducer();
  const navigate = useNavigate();
  return transactions.length > 0 ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              title="Menu Principal"
              onClick={() => navigate("/")}
              type="button"
              color="warning"
              variant="contained"
              style={{ marginRight: 10 }}
            >
              Ir Al Menu Principal
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
                  <StyledTableCell>Transacción Numero</StyledTableCell>
                  <StyledTableCell>Fecha Transacción</StyledTableCell>
                  <StyledTableCell align="right">Monto</StyledTableCell>
                  <StyledTableCell align="right">
                    numero de tarjeta
                  </StyledTableCell>
                  <StyledTableCell align="right">Tipo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell component="th" scope="row">
                      {transaction.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {format(new Date(transaction.createdAt), "MM/dd/yyyy", {
                        locale: es,
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {transaction.ammount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {transaction.creditCardCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {transaction.type === "INGRESO" ? (
                        <Button
                          type="button"
                          color="success"
                          variant="outlined"
                        >
                          INGRESO
                        </Button>
                      ) : (
                        <Button type="button" color="error" variant="outlined">
                          DEBITO
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  ) : (
    <Typography>Cargando....</Typography>
  );
};

export default MyTransactions;

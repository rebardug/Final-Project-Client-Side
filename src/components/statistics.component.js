import React, { Component, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    UserService.getStatisticsBoard(currentUser).then(
      (response) => {
        response.map((user) => {
          this.setState({ content: [...this.state.content, { user }] });
        });
        console.log(this.state.content);
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }
  editPoints() {
    console.log("aaa");
  }

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="right">points</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.content.map((user) => (
                <StyledTableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{user.user.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.user.points}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      onClick={this.editPoints.bind()}
                    >
                      edit points
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />

        <h2>The users with the highest score:</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="right">points</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.content.slice(0, 3).map((user) => (
                <StyledTableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{user.user.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.user.points}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

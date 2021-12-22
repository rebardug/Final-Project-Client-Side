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
  changePermission(email) {
    console.log("dfsdfsdf"); // print without me clicking on it
    const currentUser = AuthService.getCurrentUser();
    // UserService.changeAdmin(currentUser, email)// do not delete
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    UserService.getAdminBoard(currentUser).then(
      (response) => {
        response.map((user) => {
          this.setState({ content: [...this.state.content, { user }] });
        });
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

  render() {
    return (
      <div
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="right">
                  change permissions
                </StyledTableCell>
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
                    <Button
                      variant="contained"
                      onClick={this.changePermission.bind(user.user.email)}
                    >
                      change to user
                    </Button>
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

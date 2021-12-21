import React, { Component, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
    
  }
  
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    UserService.getUserBoard(currentUser).then(
      response => {
        response.map(user =>{
          console.log(user);
          this.setState({content: [ ...this.state.content, {user}]});
        })
        //this.setState({content: response.data});
        //this.setState({content: response[0].name});
        // const temp= JSON.stringify(response);
        // this.setState({
        // content: temp.split(",")
        // });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        {this.state.content.map(user=><div>{user.user.name} : {user.user.email}</div>)}
        </header>
      </div>
    );
  }
}
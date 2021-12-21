import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";


export default class Statistics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            content: []
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        UserService.getStatisticsBoard(currentUser).then(
            response => {
                response.map(user =>{
                    console.log(user);
                    this.setState({content: [ ...this.state.content, {user}]});
                })
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
                {this.state.content.map(user=><div>{user.user.name} : {user.user.points}</div>)}
                </header>
            </div>
        );
    }
}
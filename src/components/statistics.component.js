import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


export default class Statistics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getStatisticsBoard().then(
            response => {
                const temp= JSON.stringify(response);
                this.setState({
                content: temp.split(",")
                });
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
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
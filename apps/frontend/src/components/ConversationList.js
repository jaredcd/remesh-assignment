import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class ConversationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        fetch("api/conversations")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <ul>
                {this.state.data.map(conversation => {
                    return (
                        <li key={conversation.id}>
                            {conversation.start_date} - <Link to={`/conversations/${conversation.id}`}>{conversation.title}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

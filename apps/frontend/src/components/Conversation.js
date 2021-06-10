import React, { Component } from "react";

export default class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        fetch(`/api/conversations/${this.props.match.params.id}`)
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

    getThoughts(message) {
        return (
            <ul>
                {message.thoughts.map(thought => {
                    return (
                        <li key={thought.time}>
                            {thought.text}
                        </li>
                    );
                })}
            </ul>
        );
    }

    getMessages() {
        if ('messages' in this.state.data) {
            return (
                this.state.data.messages.map(message => {
                    return (
                        <li key={message.time}>
                            {message.text}
                            {this.getThoughts(message)}
                        </li>
                    );
                })
            );
        }
    }

    getTitle() {
        if ('title' in this.state.data) {
            return (
                <h1>{this.state.data.title}</h1>
            );
        }
    }

    render() {
        return (
            <div>
                {this.getTitle()}
                <ul>
                    {this.getMessages()}
                </ul>
            </div>
        );
    }
}

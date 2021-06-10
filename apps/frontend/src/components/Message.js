import React, { Component } from "react";

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.thought_text = React.createRef();
        this.thought_time = React.createRef();
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

    handleSubmit(event) {
        fetch('/api/thoughts/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "text": this.thought_text.current.value,
                "time": this.thought_time.current.value,
                "message": parseInt(this.props.data.id)
            })
        });
    }

    render() {
        return (
            <div>
                {this.props.data.text}
                {this.getThoughts(this.props.data)}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="message-text" ref={this.thought_text} required />
                        <input type="datetime-local" id="message-time" ref={this.thought_time} required />
                        <input type="submit" value="Add" />
                    </form>

                </div>
            </div>
        );
    }
}
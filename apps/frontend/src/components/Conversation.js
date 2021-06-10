import React, { Component } from "react";
import Message from './Message';

export default class Conversation extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.conversation_search = React.createRef();
        this.message_text = React.createRef();
        this.message_time = React.createRef();

        this.state = {
            data: {},
            loaded: false,
            placeholder: "Loading"
        };
    }

    getData() {
        const query = this.conversation_search.current.value ? `/?text=${this.conversation_search.current.value}` : '';
        fetch(`/api/conversations/${this.props.match.params.id}${query}`)
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

    componentDidMount() {
        this.getData();
    }

    getMessages() {
        if ('messages' in this.state.data) {
            return (
                this.state.data.messages.map(message => {
                    return (
                        <li key={message.time}>
                            <Message data={message}/>
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

    handleSubmit(event) {
        fetch('/api/messages/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "text": this.message_text.current.value,
                "time": this.message_time.current.value,
                "conversation": parseInt(this.props.match.params.id)
            })
        });
    }

    render() {
        return (
            <div>
                {this.getTitle()}

                <label>Search</label>
                <input type="text" id="conversation-search" onChange={this.getData} ref={this.conversation_search} />

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Create a message</label>
                        <input type="text" id="message-text" ref={this.message_text} required />
                        <input type="datetime-local" id="message-time" ref={this.message_time} required />
                        <input type="submit" value="Submit" />
                    </form>

                </div>
                <ul>
                    {this.getMessages()}
                </ul>
            </div>
        );
    }
}

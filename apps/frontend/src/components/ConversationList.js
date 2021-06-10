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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.conversation_search = React.createRef();
        this.conversation_title = React.createRef();
        this.conversation_date = React.createRef();

        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    getData() {
        const query = this.conversation_search.current.value ? `?search=${this.conversation_search.current.value}` : '';
        fetch(`api/conversations${query}`)
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

    handleSubmit(event) {
        fetch('/api/conversations/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": this.conversation_title.current.value,
                "start_date": this.conversation_date.current.value
            })
        });
    }

    render() {
        return (
            <div>
                <label>Search</label>
                <input type="text" id="conversation-search" onChange={this.getData} ref={this.conversation_search} />

                <form onSubmit={this.handleSubmit}>
                    <label>Create a conversation</label>
                    <input type="text" id="conversation-title" ref={this.conversation_title} required />
                    <input type="date" id="conversation-date" ref={this.conversation_date} required />
                    <input type="submit" value="Submit" />
                </form>

                <ul>
                    {this.state.data.map(conversation => {
                        return (
                            <li key={conversation.id}>
                                {conversation.start_date} - <Link to={`/conversations/${conversation.id}`}>{conversation.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ConversationList from "./ConversationList";
import Conversation from "./Conversation";


export default function App() {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <ConversationList />
                    </Route>
                    <Route path="/conversations/:id" component={Conversation} />
                </Switch>
            </div>
        </Router>
    );
}

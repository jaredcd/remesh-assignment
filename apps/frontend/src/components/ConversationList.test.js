import React from 'react';
import { render, screen } from '@testing-library/react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import ConversationList from './ConversationList';


describe('ConversationList', () => {

    beforeEach(() => {
        if (!global.fetch) {
            global.fetch = jest.fn();
        }
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([{ "id": 0, "title": "conversation title", "start_date": "123" }])
        })
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders ConversationList component', () => {
        render(
            <Router>
                <Route exact path="/">
                    <ConversationList />
                </Route>
            </Router>
        );
    });
});


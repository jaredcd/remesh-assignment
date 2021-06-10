import React from 'react';
import { render, screen } from '@testing-library/react';

import Message from './Message';

const fake_message = {
    "id": 0,
    "text": "test text",
    "thoughts": [{
        "id": 0,
        "time": "123",
        "text": "thought text"
    }]
};

describe('Message', () => {

    test('renders Message component', () => {
        global.fetch = jest.fn(() => Promise.resolve());
        render(<Message data={fake_message} />);

        expect(screen.getByRole('listitem').textContent).toBe('thought text')
    });
});

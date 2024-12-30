import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  test('renders main components', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByText(/ChatGPT Prompt Splitter/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Paste your text here/i)).toBeInTheDocument();
  });

  test('handles text input', async () => {
    const { getByPlaceholderText } = render(<App />);
    const textarea = getByPlaceholderText(/Paste your text here/i);
    await userEvent.type(textarea, 'Test input text');
    expect(textarea).toHaveValue('Test input text');
  });

  test('updates chunk size', () => {
    const { getByRole } = render(<App />);
    const input = getByRole('spinbutton');
    userEvent.type(input, '10000');
    expect(input).toHaveValue(10000);
  });
}); 
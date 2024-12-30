import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css';
import App from './App';
import theme from './theme';

// Suppress UNSAFE_ lifecycle warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('UNSAFE_')) return;
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/auth/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
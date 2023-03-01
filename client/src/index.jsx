import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import TestApp from './components/TestApp.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TestApp />);
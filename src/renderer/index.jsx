import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './utils/browserAlert';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

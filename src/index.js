import React from 'react';
import App from './App.js';
import reactDOM from 'react-dom';
import Container from './context/Container.js';

reactDOM.render(
  <Container>
    <App />
  </Container>,
  document.getElementById('root')
);

// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Your other global styles
import App from './App';  // Assuming your root component is App.js
import 'slick-carousel/slick/slick.css';  // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css';  // Import slick carousel theme styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

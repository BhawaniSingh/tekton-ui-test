import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// import "@carbon/charts/styles.css";
import './styles.scss';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

/* @refresh reload */
import { render } from 'solid-js/web';
import {Router} from 'solid-app-router';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";


render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { Routes } from '../src/routes/index';

ReactDOM.render(<Routes />,document.getElementById('root'));

serviceWorker.unregister();

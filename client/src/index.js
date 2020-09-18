import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Routes } from '../src/routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './config';

ReactDOM.render(<Routes />,document.getElementById('root'));

serviceWorker.unregister();

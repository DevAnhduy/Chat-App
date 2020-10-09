import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@mdi/font/css/materialdesignicons.min.css';
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "slick-carousel/slick/slick.js";
import "react-perfect-scrollbar/dist/css/styles.css";
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Routes } from '../src/routes/index';
import './config';
import store from './store';

ReactDOM.render( 
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
import React from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import  App from '../components/App/App';
import HomePage from '../components/Homepage/HomePage';
import SignUp from '../components/SignUp/SignUp.js';
import { Register_Form } from '../components/Register/Register';

export class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/sign-up" component={SignUp} />
                    {/* <Route path="/sign-in" component={} /> */}
                    <Route path="/register" component={Register_Form} />
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/chat/:receiver_type/:receiver_id" component={App} />
                </Switch>
            </Router>
        )
    }
}
import React from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import  App from '../components/App/App';
import HomePage from '../components/Homepage/HomePage';
import SignUp from '../components/SignUp/SignUp.js';
import SignIn from '../components/SignIn/SignIn.js';
import App_v2 from '../components/App_v2/App_v2';
import { CIRCLE_LOADING_WITH_LOGO } from '../components/Utils/circle_loading';

export class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/chat" component={App_v2} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/test" component={CIRCLE_LOADING_WITH_LOGO} />
                    <Route path="/chat/:receiver_type/:receiver_id" component={App_v2} />
                </Switch>
            </Router>
        )
    }
}
import React from 'react'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import  { App } from '../components/App/App'
import { Login } from '../components/Login/login'

export class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/"><App /></Route>
                    <Route path="/login"><Login /></Route>
                </Switch>
            </Router>
        )
    }
}
import React from 'react'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import  { App } from '../components/App/App'
import { Login_Form } from '../components/Login/login'
import { Register_Form } from '../components/Register/register'

export class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/"><App /></Route>
                    <Route path="/login"><Login_Form /></Route>
                    <Route path="/register"> <Register_Form /> </Route>
                </Switch>
            </Router>
        )
    }
}
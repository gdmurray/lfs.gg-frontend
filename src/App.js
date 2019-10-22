import React, {Component} from 'react';
import logo from './logo.svg';
import Login from "./containers/Login";
import TeamHome from "./components/TeamHome";
import PrivateRoute from './containers/PrivateRoute';
import './App.css';


export default class App extends Component{
  render(){
    return (
      <div>
        This is an app
      </div>
    )
  }
}

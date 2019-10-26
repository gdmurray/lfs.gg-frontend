import React, {Component} from 'react';
import {AppSidebar, Navbar} from "../Nav/";
import { Container, Menu } from 'semantic-ui-react';
//import TeamContent from "../../components/TeamContent";
import TeamCalendar from "./TeamCalendar";

export default class TeamHome extends Component{
    render(){
        console.log("At Team Home");
        return (
            <div className="app-content">
                <AppSidebar />
                <div className="core-content">
                    <Navbar />
                    <div className="page-content">
                        <TeamCalendar />
                    </div>
                </div>
            </div>
        )
    }
}
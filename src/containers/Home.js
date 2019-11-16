import React, {Component} from 'react'
import {AppSidebar, Navbar} from './Nav/';

export default class Home extends Component{
    render() {
        return (
            <div className="app-content">
                <AppSidebar />
                <div className="core-content">
                    <Navbar />
                    <div className="page-content">
                        Welcome home
                    </div>
                </div>
            </div>
        );
    }
}

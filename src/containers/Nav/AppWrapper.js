import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {AppSidebar, Navbar} from "./index";

const AppWrapper = ({children}) => {
    return (
        <div className="app-content">
            <AppSidebar/>
            <div className="core-content">
                <Navbar/>
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

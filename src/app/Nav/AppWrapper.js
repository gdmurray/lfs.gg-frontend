import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {bindActionCreators} from "redux";
import {changeActiveTeam} from "../User/ducks/actions";
import {logout} from "../Auth/ducks/actions";
import {activeTeam, userTeams} from "../../reducers";
import {fetchUserInfo} from "../User/ducks/actions";

import "./nav.css";

const AppWrapper = (props) => {
    return (
        <div className="app-content">
            <Sidebar {...props} />
            <div className="core-content">
                <Navbar {...props} />
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    notifications: [{bruh: "moment"},],
    pathname: state.router.location.pathname,
    userInfo: state.user.userInfo,
    permissions: state.user.teamPermissions,
    loading: state.user.userInfo.loading,
    //userTeams: userTeams(state.user.userInfo),
    activeTeam: activeTeam(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeActiveTeam: (team) => changeActiveTeam(team),
    goToHome: () => push("/"),
    goTo: (url) => push(url),
    logout: () => logout(),
    fetchUserInfo: () => fetchUserInfo()
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

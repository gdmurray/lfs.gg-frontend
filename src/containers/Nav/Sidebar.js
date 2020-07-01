import React, { Component } from 'react';
import {
    Sidebar, Menu, Dropdown, Header, Accordion, Icon
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { changeActiveTeam } from "../../actions/userInfo";
import { SidebarComponent } from "../../components/Nav";


const AppSidebar = (props) => {
    return (
        <SidebarComponent {...props} />
    )
}
const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    userInfo: state.userInfo.data,
    permissions: state.permissions,
    loading: state.userInfo.loading,
    activeTeam: state.userInfo.activeTeam,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeActiveTeam: (team) => changeActiveTeam(team),
    goToHome: () => push("/"),
    goTo: (url) => push(url)
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);

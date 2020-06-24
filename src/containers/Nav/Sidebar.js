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
    userInfo: state.userInfo.data,
    loading: state.userInfo.loading,
    activeTeam: state.userInfo.activeTeam,
    pathname: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeActiveTeam: (team) => changeActiveTeam(team),
    goToHome: () => push("/"),
    goTo: (url) => push(url)
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
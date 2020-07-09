import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {bindActionCreators} from "redux";
import AppWrapper from "../Nav/AppWrapper";

import {Container, Header, Tab, Menu, Label, Image} from "semantic-ui-react";
import "./notifications.css";
import NotificationsComponent from "../../app/Notifications/NotificationsComponent";


const Notifications = (props) => {
    return (
        <AppWrapper>
            <NotificationsComponent {...props}/>
        </AppWrapper>
    )
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo.data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    goToRoute: (url) => push(url),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

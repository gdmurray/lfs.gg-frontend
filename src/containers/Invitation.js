import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import AppWrapper from "./Nav/AppWrapper";
import {isAuthenticated} from "../reducers";
import {checkInvitation, acceptInvitation} from "../actions/invitations";
import InvitiationComponent from "../components/InvitiationComponent";

import "./invitation.css";

const Invitation = (props) => {
    if (props.isAuthenticated) {
        return (
            <AppWrapper>
                <InvitiationComponent {...props} />
            </AppWrapper>
        )
    } else {
        return (
            <div>
                To Join Gunga Ginga
                Please Sign In or Register
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    invitation: state.invitations.invitation
})

const mapDispatchToProps = (dispatch) => ({
    checkInvitation: (url) => dispatch(checkInvitation(url)),
    acceptInvitation: (url) => dispatch(acceptInvitation(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);

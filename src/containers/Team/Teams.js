import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {bindActionCreators} from 'redux'
import AppWrapper from "../Nav/AppWrapper";
import TeamsComponent from "../../components/Team/TeamsComponent";

const Teams = (props) => {
    return (
        <AppWrapper>
            <TeamsComponent {...props} />
        </AppWrapper>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
    goTo: (url) => push(url)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Teams);

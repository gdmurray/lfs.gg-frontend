import React from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../reducers'
import Home from "./Home";
import Landing from "../Landing/Landing";

const HomePageLogic = (props) => {
    if(props.isAuthenticated){
        return (<Home />)
    }else{
        return (<Landing />)
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, null)(HomePageLogic);

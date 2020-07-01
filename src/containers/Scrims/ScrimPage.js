import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppSidebar, Navbar } from '../Nav';
import { ScrimPageComponent } from '../../components/Scrims';
import AppWrapper from "../Nav/AppWrapper";

class ScrimPage extends Component{
    componentDidMount(){
        const { id } = this.props.match.params;
        console.log(id);
    }
    render(){
        return (
            <AppWrapper>
                        <ScrimPageComponent {...this.props}/>
            </AppWrapper>
        )
    }
}

export default connect(null, null)(ScrimPage);

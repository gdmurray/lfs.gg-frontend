import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppSidebar, Navbar } from '../Nav';
import { ScrimPageComponent } from '../../components/Scrims';

class ScrimPage extends Component{
    componentDidMount(){
        const { id } = this.props.match.params;
        console.log(id);
    }
    render(){
        return (
            <div className="app-content">
                <AppSidebar />
                <div className="core-content">
                    <Navbar />
                    <div className="page-content">
                        <ScrimPageComponent {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ScrimPage);
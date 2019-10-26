import React, {Component } from 'react';
import {
    Sidebar, Menu
} from "semantic-ui-react";

class AppSidebar extends Component{
    render(){
        return(
            <Sidebar as='menu' visible={true} className='app-sidebar' vertical>

            </Sidebar>
        )
    }
}

export default AppSidebar;
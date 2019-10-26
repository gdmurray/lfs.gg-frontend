import React, {Component} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {
    Menu, Container
} from 'semantic-ui-react';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import "./calendar.css";

class TeamContent extends Component{
    state = { activeItem: 'schedule' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render(){
        const { activeItem } = this.state
        return (
            <div className="page-content">
                <Menu pointing secondary>
                    <Menu.Item
                        icon='calendar alternate outline'
                        name='schedule'
                        active={activeItem === 'schedule'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item 
                        icon='bell outline'
                        name='notifications'
                        active={activeItem === 'notifications'}
                        onClick={this.handleItemClick}
                        />
                    <Menu.Item
                        icon='cog'
                        name='settings'
                        active={activeItem === 'settings'}
                        onClick={this.handleItemClick}
                        />
                </Menu>
                
            </div>
        )
    }
}

export default TeamContent;
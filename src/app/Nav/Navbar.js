import React, {Component} from 'react';
import {
    Menu, Container, Button, Image, Dropdown, Icon, Label
} from 'semantic-ui-react';
import {ROUTES} from "../../utils/routes";

/*
NOTIFICATIONS WHEN NOTIFICATIONS ARE READY


             <div className="app-navbar">
                <div>

                </div>
                <div className="right">

                </div>
            </div>
            <Menu className='app-navbar' fixed='top'>
                <Menu.Menu position='right' className='right-menu'>
                    <Menu.Item as='a' onClick={() => this.props.goToRoute(ROUTES.NOTIFICATIONS)}>
                        <Icon name='bell outline' className={"notifications-icon"} />

                    </Menu.Item>
                    <Dropdown item simple icon='user circle outline' size='large' className='nav-user-dropdown-icon' >
                        <Dropdown.Menu className='nav-user-dropdown'>
                            <Dropdown.Header>My Username</Dropdown.Header>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => this.props.logout()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>

            </Menu>
 */

const Navbar = (props) => {
    const showNotificatonBlip = () => {
        console.log(props);
        return null;
    }
    return (
        <div className="app-navbar">
            <div>

            </div>
            <div className="icon-group">
                <Icon name={"bell"}/>
                <Dropdown item icon={'user circle outline'}
                          className={'nav-user-dropdown-icon'} pointing="top right">
                    <Dropdown.Menu className='nav-user-dropdown noselect'>
                        <Dropdown.Header>My Username</Dropdown.Header>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => props.logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar;


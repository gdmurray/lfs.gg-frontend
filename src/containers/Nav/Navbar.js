import React, {Component} from 'react';
import {
    Menu, Container, Button, Image, Dropdown, Icon, Label
} from 'semantic-ui-react';

import {connect} from 'react-redux';
import {ROUTES} from "../../routes";
import {logout} from '../../actions/auth';
import {push} from "connected-react-router";

/*
NOTIFICATIONS WHEN NOTIFICATIONS ARE READY
<Label color='red' className='notif-label' floating circular size={"mini"}>
                           3&nbsp;
                        </Label>
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
class Navbar extends Component {
    render() {
        return (
            <div className="app-navbar">
                <div>

                </div>
                <div className="right">

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout())
    },
    goToRoute: (url) => dispatch(push(url)),
});
export default connect(null, mapDispatchToProps)(Navbar);

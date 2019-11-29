import React, { Component } from 'react';
import {
    Menu, Container, Button, Image, Dropdown, Icon, Label
} from 'semantic-ui-react';

import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

class Navbar extends Component {
    render() {
        return (
            <Menu className='app-navbar' fixed='top'>
                <Menu.Menu position='right' className='right-menu'>
                    <Menu.Item as='a'>
                        <Icon name='bell outline' />
                        <Label color='red' className='notif-label'>
                            3
                        </Label>
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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout())
    }
});
export default connect(null, mapDispatchToProps)(Navbar);
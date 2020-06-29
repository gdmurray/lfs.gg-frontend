import React, {Component} from 'react';
import AppWrapper from "../../containers/Nav/AppWrapper";

import {ROUTES} from "../../routes";
import {Menu, Button} from "semantic-ui-react";

export default class TeamsComponent extends Component {

    buttonClick = e => {
        console.log(e);
    }
    render() {
        return (
            <div>
                <Menu>
                    <Menu.Menu position={"right"}>
                        <Menu.Item>
                            <Button primary>Sign up</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={e => this.props.goTo(ROUTES.CREATE_TEAM)}  secondary>Create Team</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

            </div>
        )
    }
}

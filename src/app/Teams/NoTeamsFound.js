import React, {Component} from 'react';
import {Container, Header, Button, Icon} from "semantic-ui-react";

export default class NoTeamsFound extends Component {
    render() {
        return (
            <Container text textAlign="center">
                <Header
                    as='h2'
                    content='No Active Team'
                    inverted
                    style={{
                        color: 'black',
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                    }}
                />
                <Button primary size='huge' onClick={() => this.props.goToRoute("/create/team")}>
                    Create Team&nbsp;&nbsp;&nbsp;
                    <Icon name='plus'/>
                </Button>
            </Container>
        )
    }
}

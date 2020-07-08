import React, {Component} from 'react';

import {
    Container,
    Header,
    Loader,
    Card,
    Image,
    Button,
    Message
} from "semantic-ui-react";
import Moment from 'react-moment';

export default class InvitiationComponent extends Component {
    state = {
        url: null
    }

    componentDidMount() {
        if (this.props.match.isExact) {
            const {data} = this.props.match.params;
            let apiUrl = atob(data);
            this.setState({
                url: apiUrl
            })
            this.props.checkInvitation(apiUrl);
        }
    }

    acceptInvite = () => {
        this.props.acceptInvitation(this.state.url)
    }

    render() {
        if (this.props.invitation.loading) {
            return (
                <Loader active inline style={{marginLeft: '100px'}}>Loading</Loader>
            )
        } else if (this.props.invitation.error) {
            // todo: ERROR HANDLER, WHICH CHECKS FOR RESPONSE, IF NOT, DEFAULT MESSAGING
            const {response} = this.props.invitation.error;
            return (
                <Container>
                    <Header as={"h2"}>
                        Your Invitation
                    </Header>
                    <Message negative
                             icon={"envelope open outline"}
                             header={"Sorry! This Invitation is no longer valid"}
                             content={response.message}/>
                </Container>
            )
        } else {
            const {data} = this.props.invitation;

            return (
                <Container className="invitation-container">
                    <Header as={"h2"}>
                        Your Invitation
                    </Header>
                    <div className="card-wrapper">
                        <Card>
                            <Card.Content>
                                <Image
                                    circular
                                    floated='right'
                                    size='mini'
                                    src={data.team.logo}
                                />
                                <Card.Header>{data.team.name}</Card.Header>
                                <Card.Meta><Moment fromNow ago>{data.created}</Moment> ago</Card.Meta>
                                <Card.Description textAlign={"center"}>
                                    <strong>{data.inviter.username}</strong> wants to invite you <br/>
                                    to the Team <strong>{data.team.name}</strong> <br/>
                                    as a <strong>{data.role}</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button
                                        onClick={this.acceptInvite}
                                        inverted color='green'>
                                        Approve
                                    </Button>
                                    <Button inverted color='red'>
                                        Decline
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>

                </Container>
            );
        }

    }
}

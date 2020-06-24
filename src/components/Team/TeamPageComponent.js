import React, { Component } from 'react';

import {
    Header, Card, Form, Button,
} from 'semantic-ui-react'

import Moment from 'react-moment';

const TeamInfoComponent = (props) => {
    if(props.loadingTeam){
        return (<div>Loading Team...</div>)
    }else{
        return (<div>
            <Header as='h2' content={props.teamInfo.name} />
            <Form>
            <Form.Group>
                <Form.Field>
                    <label>Game</label>
                    <div>{props.teamInfo.game.name}</div>
                </Form.Field>
                <Form.Field>
                    <label>Platform</label>
                    <div>{props.teamInfo.settings.platform}</div>
                </Form.Field>
                <Form.Field>
                    <label>Region</label>
                    <div>{props.teamInfo.settings.region}</div>
                </Form.Field>
                <Form.Field>
                    <label>Timezone</label>
                    <div>{props.teamInfo.settings.timezone}</div>
                </Form.Field>
            </Form.Group>
            </Form>
            <Button style={{float: 'right',position: 'relative', bottom: '100px'}} content="Request Scrim"/>
        </div>)
    }
}

const TeamScrimsComponent = (props) => {
    if(props.loadingScrims){
        return (<div>Loading scrims...</div>)
    }else{
        return (
            <Card.Group className="scrim-group">{props.scrims.map((scrim, i) => (
                <Card key={`card-${i}`} className="scrim" onClick={props.goToScrim.bind(this, scrim.uuid)}>
                    <Card.Content>
                        <Card.Header><Moment date={scrim.time} format={"dddd MMM Do ha"}/></Card.Header>
                        <Card.Meta>{scrim.status}</Card.Meta>
                        <Card.Description>
                            {scrim.request_notes}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui one buttons'>
                            <Button inverted color='green'>
                                Request
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            )) }</Card.Group>
        )
    }
}
export default class TeamPageComponent extends Component{
    render(){
        return(
            <div>
                <TeamInfoComponent {...this.props}/>
                <hr/>
                <TeamScrimsComponent {...this.props}/>
            </div>
        )
    }
}
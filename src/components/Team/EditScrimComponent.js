import React, {Component} from 'react'

import {
    Modal, Form, Button, Menu, Segment, Label
} from 'semantic-ui-react';
import {
    DateTimeInput,
} from 'semantic-ui-calendar-react';

const moment = require('moment');

export default class EditScrimComponent extends Component {
    state = {
        editMode: false,
    }

    handleInputChange = (event) => {
        const target = event.target, value = target.type ===
            'checkbox' ? target.checked : target.value,
            name = target.name

        this.setState({
            [name]: value
        });
    }

    getIcons() {
        if (!this.state.editMode) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item onClick={() => this.setState({editMode: true})} as='a' icon='edit outline'/>
                    <Menu.Item as='a' icon='trash alternate outline'/>
                </Menu.Menu>
            )
        } else {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item as='a' icon='checkmark' color='green'/>
                    <Menu.Item onClick={() => this.setState({editMode: false})} as='a' icon='times circle outline'
                               color='red'/>
                </Menu.Menu>
            )
        }
    }


    getField = (name) => {
        //console.log(name);
        //console.log(this.props);
        //console.log(this.props.scrim);
        const {editMode} = this.state;
        const {scrim} = this.props;
        if (name === 'request_notes') {
            if (!editMode) {
                return (<span>{scrim.request_notes}</span>)
            } else {
                return (<input onChange={this.handleInputChange} name='notes'
                               value={scrim.request_notes ? scrim.request_notes : ''}/>)
            }
        } else if (name === 'time') {
            if (!editMode) {
                //console.log(scrim.time);
                return (<span>{moment(scrim.time).format('h:mm a')}</span>)
            } else {
                return (
                    <DateTimeInput timeFormat='ampm' onChange={this.handleInputChange} name='time' value={scrim.time}/>)
            }
        }
    }

    render() {
        return (
            <div style={{marginBottom: '10px'}}>
                <Menu attached='top' className='edit-scrim-menu'>
                    <Menu.Item className='edit-scrim-menu-label'>
                        <Label content={this.props.scrim.status} color='yellow'/>
                    </Menu.Item>
                    {this.getIcons()}
                </Menu>
                <Segment attached='bottom' style={{paddingBottom: '0rem'}}>
                    <Form className="scrim-form">
                        <Form.Group>
                            <Form.Field style={{width: '30%'}}>
                                <label>Time</label>
                                {this.getField('time')}
                            </Form.Field>
                            <Form.Field style={{width: '40%'}}>
                                <label>Notes</label>
                                {this.getField('request_notes')}
                            </Form.Field>
                            <Form.Field style={{width: '30%', textAlign: 'right'}}>
                                <label>Opponent Team</label>
                                <span>-</span>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </div>
        )
    }
}

import React, {Component} from 'react';
import Moment from 'react-moment';

import {
    Table, Label
} from 'semantic-ui-react';


export default class TeamScrimsComponent extends Component{
    componentDidMount(){
        this.props.getScrims(this.props.activeTeam);
    }
    renderScrims = () => {
        const { scrims } = this.props;
        return (scrims.map((item, i) => (
            <Table.Row>
                <Table.Cell className="scrim-time-cell"><Moment date={item.time} format={"dddd MMM Do"}/><b><Moment date={item.time} format={"ha"}/></b> </Table.Cell>
                <Table.Cell><Label color="yellow">{item.status}</Label></Table.Cell>
                <Table.Cell>{item.secondary_team}</Table.Cell>
                <Table.Cell>{item.request_notes}</Table.Cell>
            </Table.Row>)
        ))
    }
    render() {
        const {loading} = this.props;
        if(loading){
            return (
                <div>Loading</div>
            )
        }else{
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderScrims()}
                    </Table.Body>
                </Table>
            );
        }
    }
}
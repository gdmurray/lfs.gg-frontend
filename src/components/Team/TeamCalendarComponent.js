import React, { Component } from 'react';
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EditScrimModal from "./EditScrimModal";
import EditScrimComponent from "./EditScrimComponent";
import {
    Menu, Container, Modal, Button
} from 'semantic-ui-react';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import "./calendar.css";
import { get } from 'https';
import "./teams.css";

const moment = require('moment');

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

export default class TeamCalendarComponent extends Component {
    state = {
        activeScrimTab: 'upcoming',
        dateClicked: null,
        doubleClicks: 0,
        dateClickTimeout: 0,
        newScrims: [],
        selection: [],
        calendarSelection: null,
        modalOpen: false,
    }


    calendarRef = React.createRef()

    handleItemClick = (e, { name }) => this.setState({ activeScrimTab: name })
    modalClosed = () => this.setState({ modalOpen: false });

    _handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 8:
                if(this.calendarRef.current){
                    var calendar = this.calendarRef.current.getApi();
                    const { calendarSelection, selection } = this.state;
                    if (calendarSelection || selection.length > 0) {
                        var { newScrims } = this.state;
                        var nsIds = newScrims.map(s => s.id);
                        //var days = getDates(calendarSelection.start, calendarSelection.end);
                        var del = [];
                        console.log(calendarSelection, selection);
                        var selectionEvents = this.getSelectedEventsFromCalendar(calendarSelection);
                        var selectedEvents = selection.length > 0 ? selection.map(id => calendar.getEventById(id)) : selectionEvents;
                        //console.log(selectedEvents);
                        for (var evt of selectedEvents) {
                            if(evt){
                                if (nsIds.includes(evt.id)) {
                                    evt.remove()
                                    del.push(evt.id);
                                }
                            }
                        }
                        newScrims = newScrims.filter(item => !del.includes(item.id))
                        this.setState({
                            newScrims: newScrims
                        })
                    }
                }
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.fetchScrims(this.props.activeTeam);
        document.addEventListener("keydown", this._handleKeyDown);
    }

    fetchScrims = () => {
        this.props.fetchScrims(this.props.activeTeam);
    }

    
    setActiveTab = (tab) => {
        this.setState({ activeScrimTab: tab })
    }

    testClick = (event) => {
        //var eventId = event.target.parentElement.parentElement.getAttribute('id');
        this.setState({
            modalOpen: true
        })
    }

    handleDayKeyPress = (event) => {
        console.log(event);
    }

    doubleClickDay = (event) => {
        const { newScrims } = this.state;
        var nd = event.date;
        nd.setHours(event.date.getHours() + 2);
        var newScrim = {
            id: 'ns-' + (newScrims.length + 1),
            title: "NewScrim",
            backgroundColor: 'green',
            textColor: 'black',
            allDay: true,
            start: event.date.toISOString(),
            end: nd.toISOString()
        };
        var calendar = this.calendarRef.current.getApi();
        calendar.addEvent(newScrim);
        newScrims.push(newScrim);
        this.setState({ newScrims: newScrims, activeScrimTab: 'new' }, this.selectedEventsChanged)

    }

    customRender = elem => {
        elem.el.id = elem.event.id;
        elem.el.ondblclick = this.testClick;
        return elem.el;
    }

    getSelectedEventsFromCalendar = (selection, id = false) => {
        //console.log("get events from cal ", selection.start, selection.end);
        var calendar = this.calendarRef.current.getApi();
        var events = calendar.getEvents();
        if (id) {
            return events.filter(evt => moment(evt.start).isBetween(moment(selection.start), moment(selection.end))).map(evt => evt.id);
        } else {
            return events.filter(evt => moment(evt.start).isBetween(moment(selection.start), moment(selection.end)));
        }
    }

    customDateClick = (event) => {
        if (this.state.doubleClicks === 0) {
            this.setState({ doubleClicks: 1, dateClicked: event.dateStr })
            setTimeout(function () {
                this.setState({ doubleClicks: 0, dateStr: null })
            }.bind(this), 300)
        } else {
            if (event.dateStr === this.state.dateClicked) {
                this.doubleClickDay(event);
            }
            this.setState({ doubleClicks: 0, dateClicked: null });
        }
    }

    selectedEventsChanged = () => {
        const { selection } = this.state;
        var calendar = this.calendarRef.current.getApi();
        var calEvents = calendar.getEvents();
        var selectedEvents = calEvents.filter(evt => selection.includes(evt.id));
        var nonSelectedEvents = calEvents.filter(evt => !(selection.includes(evt.id)) && evt.classNames.includes("selected"))
        for (var scrim of selectedEvents) {
            scrim.setProp('classNames', 'selected');
        }
        for (var scrim2 of nonSelectedEvents) {
            scrim2.setProp('classNames', []);
        }

    }
    customEventClick = (e) => {
        const { selection } = this.state;
        if (e.jsEvent.shiftKey) {
            if (!(selection.includes(e.event.id))) {
                this.setState({
                    selection: [...selection, e.event.id]
                }, this.selectedEventsChanged);
            } else {
                this.setState({
                    selection: selection.filter(item => item !== e.event.id)
                }, this.selectedEventsChanged);
            }
        } else {
            this.setState({
                selection: [e.event.id],
                calendarSelection: false
            }, this.selectedEventsChanged);
        }
    }

    customDayRender = (elem) => {
        elem.el.onkeypress = this.handleDayKeyPress;
        elem.el.onkeydown = this.handleDayKeyPress;
        return elem.el;
    }

    customSelect = (event) => {
        var selected = {
            start: event.start.setHours(0),
            end: event.end.setHours(0)
        }
        console.log("customSelect");
        this.setState({ calendarSelection: selected, selection: this.getSelectedEventsFromCalendar(selected, true) }, this.selectedEventsChanged);
    }

    getContent = () => {
        if (this.state.activeScrimTab === 'new') {
            return (
                <ul>
                    {this.state.newScrims.map((item) => <li key={item.id}>{item.title}</li>)}
                </ul>
            )
        } else if (this.state.activeScrimTab === 'upcoming') {
            if(this.props.scrims){
                console.log(this.props.scrims);
                return (
                    <ul className='scrim-list'>
                        {this.props.scrims.map((item, i) => <EditScrimComponent key={'scrim-'+i} scrim={item.extendedProps} />)}
                    </ul>
                )
            }
            return (
               <span>No Scrims Upcoming</span>
            )
            
        }
    }

    outerClick = (event) => {
        var inner_classes = [null, "fc-day-header", "fc-row", "fc-day-number", "fc-day-top", "fc-icon", "fc-button", "fc-today-button", "fc-content-skeleton"]
        var classList = event.target.getAttribute('class'); 
        if(classList){
            classList = classList.split(" ");
        }else{
            classList = [classList];
        }
        var cancel_click = true;
        for(var cls of classList){
            if(inner_classes.includes(cls)){
                cancel_click = false;
            }
        }
        //console.log(classList);
        //console.log(cancel_click);
        if(cancel_click){
            this.setState({
                calendarSelection: false,
                selection: []
            }, this.selectedEventsChanged)
        }
    }
    render() {
        const { activeScrimTab, modalOpen } = this.state;
        console.log(this.state.newScrims);
        return (
            <Container style={{ padding: '1rem' }} onClick={this.outerClick}>
                <EditScrimModal modalOpen={modalOpen} onClose={this.modalClosed} />
                <div className="calendar-wrapper" >
                    <FullCalendar selectable={true}
                        timeZone={'America/Toronto'}
                        ref={this.calendarRef}
                        id='teamCalendar'
                        eventClick={this.customEventClick}
                        eventRender={this.customRender}
                        dateClick={this.customDateClick}
                        dayRender={this.customDayRender}
                        select={this.customSelect}
                        events={this.props.scrims ? this.props.scrims : []}
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]} />
                </div>
                <div className="calendar-scrim-table">
                    <Menu pointing secondary>
                        <Menu.Item
                            name='new'
                            active={activeScrimTab === 'new'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='upcoming'
                            active={activeScrimTab === 'upcoming'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='past'
                            active={activeScrimTab === 'past'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <div className="table-content">
                        {this.getContent()}
                    </div>
                </div>
            </Container>
        )
    }
}

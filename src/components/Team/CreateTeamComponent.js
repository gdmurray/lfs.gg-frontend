import React, {Component} from 'react';

import {Form, Button, Image} from "semantic-ui-react";
import {REGION_OPTIONS} from "../../constants";

import "./teams.css";

export default class CreateTeamComponent extends Component {
    fileInputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: process.env.PUBLIC_URL + "/img/ui/default-img.png",
            region: 'NA'
        }
    }

    /*
    onFileUpload = e => {
        console.log(e);
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            var obj = URL.createObjectURL(e.target.files[0]);
            console.log(obj);
            this.setState({imageSrc: obj, logo: e.target.files[0]});
        }

    }

    <Form.Field>
        <label>Team Logo</label>
        <Image src={this.state.imageSrc}
               size='small' circular
               onClick={() => this.fileInputRef.current.click()}
        />
        <input type="file" name='logo' onChange={this.onFileUpload} ref={this.fileInputRef} hidden/>
    </Form.Field>
     */

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
    }

    handleChange = (event) => {
        const target = event.target, value = target.type ===
            'checkbox' ? target.checked : target.value,
            name = target.name

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = e => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            region: this.state.region
        }
        this.props.createTeam(data);
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Group widths="two">
                    <Form.Input
                        name='name'
                        type='text'
                        label='Team Name'
                        placeholder='Team Name'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group widths="two">
                    <Form.Select
                        fluid
                        name='region'
                        label='Region'
                        defaultValue='NA'
                        onChange={this.handleChange}
                        options={REGION_OPTIONS}
                        placeholder='Region'
                    />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        )
    }
}

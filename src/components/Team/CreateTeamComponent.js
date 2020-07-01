import React, {Component} from 'react';

import {Image} from "semantic-ui-react";
import {Form as SUIForm} from "semantic-ui-react";
import {REGION_OPTIONS} from "../../constants";
import {Form, Input, Button, Dropdown} from 'formik-semantic-ui';
import {setErrors} from "formik";
import "./teams.css";


// TODO: INPUT VALIDATION AND ERROR HANDLING
export default class CreateTeamComponent extends Component {
    fileInputRef = React.createRef();

    initialValues = {
        name: '',
        region: 'NA'
    }
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

    _handleSubmit = (values, formikApi) => {
        console.log(values);
        this.props.createTeam(values);
    }

    validate = (values) => {
        const errors = {};
        if(values.name == ''){
            errors.name = "Name Cannot be Blank"
        }
        return errors;
    }
    render() {
        if(this.props.loading){
            return (
                <div>loading</div>
            )
        }else {
            return (
                <Form onSubmit={this._handleSubmit} initialValues={this.initialValues} validate={this.validate}>
                    <SUIForm.Group widths="two">
                        <Input
                            name='name'
                            type='text'
                            label='Team Name'
                            placeholder='Team Name'
                        />
                    </SUIForm.Group>
                    <SUIForm.Group widths="two">
                        <Dropdown
                            name='region'
                            label='Region'
                            options={REGION_OPTIONS}
                            placeholder='Region'
                        />
                    </SUIForm.Group>
                    <Button.Submit>Submit</Button.Submit>
                </Form>
            )
        }
    }
}

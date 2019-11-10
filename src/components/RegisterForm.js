import React, { Component } from 'react';
import {Form, Input, Button} from 'formik-semantic-ui'; 
import { Container, Header} from 'semantic-ui-react';

class RegisterForm extends Component{
    _handleSubmit = (values, formikApi) => {
        this.props.register(values);
    }
    initialValues = {
        username: '',
        email: '',
        password1: '',
        password2: ''
    }
    validate = (values) => {
        const errors = {};
        if(values.password1 !== '' && values.password2 !== ''){
            if(values.password1 !== values.password2){
                errors.password2 = "Passwords Don't Match"
            }
        }
        
        return errors;

    }
    render() {
        return (
            <Container>
                <Header as='h2'>Register for lfs.gg</Header>
                <Form onSubmit={this._handleSubmit} initialValues={this.initialValues} validateOnBlur={true} validate={this.validate}>
                    <Input label="Username" name="username" type="text" />
                    <Input label="Email" name="email" type="email"/>
                    <Input
                        label="Password"
                        name="password1"
                        inputProps={{
                        type: 'password',
                        }}
                    />
                    <Input
                        label="Confirm Password"
                        name="password2"
                        inputProps={{
                        type: 'password',
                        }}
                    />
                    <Button.Submit primary>Submit</Button.Submit>
                </Form>
            </Container>
            
        );
    }
}

export default RegisterForm;
import React, { Component } from 'react'
import { Container, Button, Form} from 'semantic-ui-react';

export default class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    }

    handleInputChange = (event) => {
        const target = event.target, value = target.type ===
            'checkbox' ? target.checked : target.value,
            name = target.name

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        console.log("Submitting");
        console.log(this.state);
        event.preventDefault()
        this.props.onSubmit(this.state.username, this.state.password)
      }

    render(){
        const errors = this.props.errors || {}
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <h1>Authentication</h1>
                    <Form.Input name="username" label="Username"
                        error={errors.username} onChange={this.handleInputChange}/>
                    <Form.Input name="password" label="Password" type="password"
                        error={errors.password} onChange={this.handleInputChange}/>
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}
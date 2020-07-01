import React, {Component} from 'react';
import {Form, Input, Button} from 'formik-semantic-ui';
import {Container, Header} from 'semantic-ui-react';

class RegisterForm extends Component {

    state = {
        urlPayload: false
    }

    _handleSubmit = (values, formikApi) => {
        if (this.state.urlPayload) {
            const {token} = this.state.urlPayload;
            let query = `?token=${token}`
            this.props.register(values, query)
        } else {
            this.props.register(values);
        }

    }

    initialValues = {
        username: '',
        email: '',
        password1: '',
        password2: ''
    }

    validate = (values) => {
        const errors = {};
        if (values.password1 !== '' && values.password2 !== '') {
            if (values.password1 !== values.password2) {
                errors.password2 = "Passwords Don't Match"
            }
        }
        if (values.password1 == '' && values.password2 == '') {
            errors.password2 = 'Must enter a password'
        }
        if (values.username === '') {
            errors.username = "Username must not be blank";
        }

        return errors;

    }

    getInitialValues = () => {
        if (this.props.location.search !== "") {
            const {search} = this.props.location;
            if (search.startsWith('?ref=')) {
                var refPayload = search.replace('?ref=', '');
                let decodedPayload = JSON.parse(atob(refPayload));

                if (decodedPayload.initialValues) {
                    return Object.assign(this.initialValues, decodedPayload.initialValues);
                }
            }
        }
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.location.search !== "") {
            const {search} = this.props.location;
            if (search.startsWith('?ref=')) {
                var refPayload = search.replace('?ref=', '');
                let decodedPayload = JSON.parse(atob(refPayload));
                this.setState({
                    urlPayload: decodedPayload
                })
            }
        }
    }

    renderAdditionalMessages = () => {
        if (this.state.urlPayload) {
            return (
                <div>
                    <Header>{this.state.urlPayload.message}</Header>
                </div>
            )
        }
    }

    render() {
        console.log(this.initialValues);
        return (
            <Container>

                <Header as='h2'>Register for lfs.gg</Header>
                {this.renderAdditionalMessages()}
                <Form onSubmit={this._handleSubmit} initialValues={this.getInitialValues()} validateOnBlur={true}
                      validate={this.validate}>
                    <Input label="Username" name="username" type="text"/>
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

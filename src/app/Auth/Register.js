import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import RegisterForm from './RegisterForm'
import {registerUser} from './ducks/actions'
import {Container} from 'semantic-ui-react';
import {registerErrors, isAuthenticated} from '../../reducers'

const Register = (props) => {
    if (props.isAuthenticated) {
        return (
            <Redirect to='/'/>
        )
    } else {
        return (
            <div className="login-page">
                <RegisterForm {...props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: registerErrors(state),
    isAuthenticated: isAuthenticated(state),
})

const mapDispatchToProps = (dispatch) => ({
    register: (values, query = '') => {
        dispatch(registerUser(values, query))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
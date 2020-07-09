import React from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import * as reducers from '../../reducers'

const PrivateRoute = ({children, isAuthenticated, ...rest}) => {
    if (rest.component !== undefined) {
        return (
            <Route {...rest} render={props => (
                isAuthenticated ? (
                    <rest.component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        )
    } else {
        // Ability to pass children into private Route
        return (
            <Route {...rest} render={props => (
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: reducers.isAuthenticated(state)
})
export default connect(mapStateToProps, null)(PrivateRoute);

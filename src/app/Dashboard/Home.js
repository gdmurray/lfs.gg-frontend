import React, {Component} from 'react'
import {AppWrapper} from "../Nav";

export default class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <AppWrapper>
                Welcome home
            </AppWrapper>
        );
    }
}

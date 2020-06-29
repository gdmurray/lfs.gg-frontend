import React, {Component} from 'react';
import ScrimDetailComponent from "./ScrimDetailComponent";
import ScrimOpenComponent from "./ScrimOpenComponent";

export default (props) => {
    /*if(props.scrim.status == "CONFIRMED"){
        return (<ScrimOpenComponent {...props} />)
    }else{
        return (<ScrimDetailComponent {...props} />)
    }*/
    return (<ScrimOpenComponent {...props}/>)
}